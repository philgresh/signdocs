# == Schema Information
#
# Table name: documents
#
#  id          :uuid             not null, primary key
#  description :text
#  editor_ids  :uuid             is an Array
#  title       :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  owner_id    :uuid             not null
#
# Indexes
#
#  index_documents_on_owner_id  (owner_id)
#
require "aws-sdk-s3"

class Document < ApplicationRecord
  ACCEPTABLE_TYPES = ["application/pdf", "image/png", "image/jpg", "image/jpeg", "image/jpg", "image/svg+xml"]
  S3 = Aws::S3::Resource.new(region: Rails.application.credentials.dig(:aws, :region))
  BUCKET = S3.bucket(Rails.application.credentials.dig(:aws, :bucket))

  validates_presence_of :owner_id
  validates :file,
            attached: true,
            content_type: {
              in: ACCEPTABLE_TYPES,
              message: "is not an acceptable type",
            },
            size: {
              less_than: 20.megabytes,
              message: "is not given between size",
            }

  # validates :editor_ids, presence: true

  # ActiveStorage association
  has_one_attached :file

  # ActiveRecord associations
  has_many :content_fields,
           class_name: :ContentField,
           dependent: :destroy
  has_many :editors,
           class_name: :User,
           foreign_key: :editor_ids
  belongs_to :owner,
             class_name: :User,
             foreign_key: :owner_id

  before_validation :set_defaults, unless: :persisted?

  def blob
    if file && file.blob
      file.blob
    else
      nil
    end
  end

  def gen_presigned_url(expires_in = 900)
    blob.service_url(expires_in: expires_in)
  end

  private

  def set_defaults
    self.editor_ids ||= []
  end
end
