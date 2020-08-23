# == Schema Information
#
# Table name: signature_blocks
#
#  id         :bigint           not null, primary key
#  body       :string           not null
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

class SignatureBlock < ApplicationRecord
  SIGNING_ALGORITHM = "RSASSA_PSS_SHA_256"
  
  
  validates_presence_of :user_id
  belongs_to :user
  has_one :content_fields, as: :contentable
  has_one_attached :sig_image

  def gen_new_pub_key
    response = kms.create_key({ 
      key_usage: "SIGN_VERIFY",
      customer_master_key_spec: "RSA_3072",
      tags: [{tag_key: "user_id", tag_value: self.user_id}] 
    })

    if response
      self.pub_key = response.key_metadata.key_id
      self.save!
    end
    self.pub_key
  end

  def fetch_pub_key
    key_id = self.pub_key ? self.pub_key : new_pub_key
    kms.get_public_key({key_id: response.key_metadata.key_id})
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
    kms.sign({
      key_id: self.pub_key,
      message: message,
      signing_algorithm: SIGNING_ALGORITHM
    })
  end

  def verify_signature(doc, signature)
    signing_algorithm = signature.signing_algorithm || SIGNING_ALGORITHM
    message = signing_message(doc)
    key_id = signature.key_id || self.pub_key
  
    kms.verify({
      key_id: self.pub_key,
      message: message,
      signing_algorithm: signing_algorithm,
      signature: signature.signature
    })
  end

  private
  def kms
    Aws::KMS::Client.new(
      region: 'us-west-2',
      access_key_id: ENV['AWS_ACCESS_KEY_ID'],
      secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
    )
  end

  def signing_message(doc)
    blob = doc.file.blob
    message = "#{blob.key}#{blob.byte_size}#{blob.checksum}"
  end
end
