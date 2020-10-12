# == Schema Information
#
# Table name: signature_blocks
#
#  id                  :uuid             not null, primary key
#  pub_key             :string
#  pub_key_fingerprint :string
#  styling             :json
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  user_id             :uuid             not null
#
# Indexes
#
#  index_signature_blocks_on_user_id  (user_id) UNIQUE
#
require "aws-sdk-s3"
require "victor"
require "digest/md5"
require "cuid"

class SignatureBlock < ApplicationRecord
  SIGNING_ALGORITHM = "RSASSA_PSS_SHA_256"
  FONT_ASSETS_PATH = Rails.root.join("app", "assets", "fonts")
  SIGNATURE_STYLE_FONT_FAMILIES = [
    {
      font_family: "'Caveat'",
      style: "Caveat",
      file: "#{FONT_ASSETS_PATH}/Caveat-Regular.ttf",
    },
    {
      font_family: "'Dancing Script'",
      style: "Dancing Script",
      file: "#{FONT_ASSETS_PATH}/DancingScript-Regular.ttf",
    },
    {
      font_family: "'Homemade Apple'",
      style: "Homemade Apple",
      file: "#{FONT_ASSETS_PATH}/HomemadeApple-Regular.ttf",
    },
    {
      font_family: "'Permanent Marker'",
      style: "Permanent Marker",
      file: "#{FONT_ASSETS_PATH}/PermanentMarker-Regular.ttf",
    },
    {
      font_family: "'Rock Salt'",
      style: "Rock Salt",
      file: "#{FONT_ASSETS_PATH}/RockSalt-Regular.ttf",
    },
  ].freeze
  # COLORS = %w[darkgreen #000028 midnightblue royalblue darkslategray teal].freeze

  IMGS_PATH = "#{Rails.root}/app/assets/images/"

  before_create :gen_new_pub_key
  after_create :gen_svg_from_name
  validates_presence_of :user_id
  belongs_to :user
  has_one :content_fields, as: :contentable
  has_one_attached :sig_image

  def self.get_font_object_from_family(family)
    SignatureBlock::SIGNATURE_STYLE_FONT_FAMILIES.find { |font| font[:style] == family }
  end

  def self.get_font_file_from_family(family)
    font_obj = get_font_object_from_family(family)
    return nil unless font_obj
    font_obj[:file]
  end

  def self.get_font_name_from_family(family)
    font_obj = get_font_object_from_family(family)
    font_family = font_obj[:font_family]
    font_family[/[\'\"]?([A-Za-z ]*)[\'\"]?/, 1]
  end

  def block_type
    "SIGNATURE"
  end

  def gen_new_pub_key
    self.pub_key = Cuid::generate
    self.pub_key_fingerprint = self.pub_key.upcase
    # @kms ||= kms
    # response = @kms.create_key({
    #   key_usage: "SIGN_VERIFY",
    #   customer_master_key_spec: "RSA_3072",
    #   tags: [{ tag_key: "user_id", tag_value: self.user_id }],
    # })

    # if response
    #   self.pub_key = response.key_metadata.key_id
    #   self.pub_key_fingerprint = fetch_pub_key(true)
    # end
    self.pub_key
  end

  def fetch_pub_key(truncated = false)
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

  def gen_svg_from_name(
    font_family = SIGNATURE_STYLE_FONT_FAMILIES.sample[:style],
    fill_color = "#000028"
  )
    @user = self.user
    name_text = "#{@user.first_name} #{@user.last_name}"
    svg = Victor::SVG.new width: 300, height: 100, style: { background: "#ffffff00" }
    svg.text(
      name_text,
      x: 20,
      y: 60,
      font_family: font_family,
      font_size: 30,
      fill: fill_color,
    )
    self.styling = { font_family: font_family, fill: fill_color }

    gen_svg_wrapper(svg)
  end

  def svg_wrapper
    @user ||= self.user
    svg = Victor::SVG.new width: 300, height: 100, style: { background: "#ffffff00" }

    fingerprint_text = self.pub_key_fingerprint
    svg.build do
      svg.path(
        d: "M 50 10 l -20 0 a 25 25 90 0 0 -25 25 L 5 65 a 25 25 90 0 0 25 25 L 50 90",
        stroke: "#000028",
        fill: "transparent",
        stroke_width: "4",
        stroke_linecap: "round",
      )
      svg.text(
        "SignDocked by:",
        x: 55,
        y: 15,
        # font_family: "'Roboto'",
        font_size: 15,
        fill: "#000028",
        font_weight: "700",
      )
      svg.text(
        fingerprint_text,
        x: 55,
        y: 94,
        # font_family: "'Roboto Mono'",
        font_size: 12,
        fill: "#000028",
      )
    end
    svg
  end

  def gen_svg_wrapper(inner)
    svg = svg_wrapper
    svg << inner
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

  def make_checksum(string)
    Digest::MD5.hexdigest string
  end
end
