# == Schema Information
#
# Table name: signature_blocks
#
#  id         :uuid             not null, primary key
#  pub_key    :string
#  styling    :json
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :uuid             not null
#
# Indexes
#
#  index_signature_blocks_on_user_id  (user_id) UNIQUE
#
require "aws-sdk-s3"
require "victor"
require 'digest/md5'

class SignatureBlock < ApplicationRecord
  SIGNING_ALGORITHM = "RSASSA_PSS_SHA_256"
  SIGNATURE_STYLE_FONT_FAMILIES = [
    "'Caveat', cursive",
    "'Dancing Script', cursive",
    "'Homemade Apple', cursive",
    "'Permanent Marker', cursive",
    "'Rock Salt', cursive",
  ].freeze
  COLORS = %w[darkgreen black midnightblue royalblue darkslategray teal].freeze

  IMGS_PATH = "#{Rails.root}/app/assets/images/"

  before_save :ensure_pub_key
  after_create :gen_svg_from_name
  validates_presence_of :user_id
  belongs_to :user
  has_one :content_fields, as: :contentable
  has_one_attached :sig_image

  def gen_new_pub_key
    @kms ||= kms
    response = @kms.create_key({
      key_usage: "SIGN_VERIFY",
      customer_master_key_spec: "RSA_3072",
      tags: [{ tag_key: "user_id", tag_value: self.user_id }],
    })

    if response
      self.pub_key = response.key_metadata.key_id
      self.save!
    end
    self.pub_key
  end

  def fetch_pub_key(truncated=false)
    key_id = self.pub_key ? self.pub_key : new_pub_key
    @kms ||= kms

    key = @kms.get_public_key({ key_id: key_id }).public_key
    if truncated
      return make_checksum(key).upcase
    else
      return key
    end
  end

  def schedule_key_deletion(days = 7)
    days = 7 if days < 7
    if self.pub_key
      kms.schedule_key_deletion({
        key_id: self.pub_key,
        pending_window_in_days: days,
      })
    end
  end

  def sign_document(doc)
    message = signing_message(doc)
    @kms ||= kms
    @kms.sign({
      key_id: self.pub_key,
      message: message,
      signing_algorithm: SIGNING_ALGORITHM,
    })
  end

  def verify_signature(doc, signature)
    signing_algorithm = signature.signing_algorithm || SIGNING_ALGORITHM
    message = signing_message(doc)
    key_id = signature.key_id || self.pub_key
    @kms ||= kms
    @kms.verify({
      key_id: self.pub_key,
      message: message,
      signing_algorithm: signing_algorithm,
      signature: signature.signature,
    })
  end

  private

  def ensure_pub_key
    self.pub_key ||= gen_new_pub_key
  end

  def kms
    if Rails.env.production?
      return Aws::KMS::Client.new(
               region: ENV["AWS_REGION"],
               access_key_id: ENV["AWS_ACCESS_KEY_ID"],
               secret_access_key: ENV["AWS_SECRET_ACCESS_KEY"],
             )
    else
      return Aws::KMS::Client.new(
               region: ENV["aws_region"] || "us-west-2",
               access_key_id: ENV["aws_access_key_id"],
               secret_access_key: ENV["aws_secret_access_key"],
             )
    end
  end

  def signing_message(doc)
    blob = doc.file.blob
    message = blob.checksum
  end

  def gen_svg_from_name
    svg = Victor::SVG.new width: 300, height: 100, style: { background: "#ffffff00" }
    @user=self.user
    svg_text = "#{@user.first_name} #{@user.last_name}"
    svg.build do
      svg.text svg_text,
               x: 20,
               y: 65,
               font_family: SIGNATURE_STYLE_FONT_FAMILIES.sample,
               font_size: 30,
               fill: COLORS.sample
    end
    local_link = "#{IMGS_PATH}#{Time.now.to_i}.svg"
    svg.save local_link
    self.sig_image.attach(
      io: File.open(local_link),
      content_type: "image/svg+xml",
      filename: "#{@user.id}-sig-image.svg",
      # identify: false,
    )
    self.save!
    File.delete(local_link) if File.exist?(local_link)
  end

  def make_checksum string
    Digest::MD5.hexdigest string
  end
end
