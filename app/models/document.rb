# == Schema Information
#
# Table name: documents
#
#  id          :uuid             not null, primary key
#  description :text
#  title       :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
require "aws-sdk-s3"
require "open-uri"

class Document < ApplicationRecord
  IMGS_PATH = "#{Rails.root}/app/assets/images/"
  ACCEPTABLE_TYPES = ["application/pdf", "image/png", "image/jpg", "image/jpeg", "image/jpg", "image/svg+xml"]
  BEING_PREPARED = "Being Prepared"
  COMPLETE = "Complete"
  IN_PROGRESS = "In Progress"
  FINAL = "Final"

  validates_presence_of :title
  validates :file,
            content_type: {
              in: ACCEPTABLE_TYPES,
              message: "is not an acceptable type",
            },
            size: {
              less_than: 30.megabytes,
              message: "is not given between size",
            }

  # ActiveStorage association
  has_one_attached :file
  has_one_attached :final

  # ActiveRecord associations
  has_many :content_fields,
           class_name: :ContentField,
           dependent: :destroy
  has_many :document_editors
  has_many :editors,
           through: :document_editors,
           source: :user
  has_many :signatures,
           through: :editors,
           source: :signature

  def self.setup_default(user)
    title = "Addendum to Contract"
    description = "Backup contract for property at 123 Main St., Anytown, TX"

    @document = Document.new(title: title, description: description)

    @document.file.attach(
      io: open("https://signdocs-public.s3-us-west-2.amazonaws.com/backup.pdf"),
      filename: "backup.pdf",
      content_type: "application/pdf",
    )
    @document.save
    @document.final.detach #  I don't understand why it's necessary to do this. Stupid.
    @document.editor_ids = [user.id]
    @document.owner = user
    @document
  end

  def blob
    file.blob if file && file.blob
  end

  def gen_presigned_url(expires_in = 900)
    blob.service_url(expires_in: expires_in)
  end

  def owner
    d_owner = document_editor_owner
    d_owner.user unless d_owner.nil?
  end

  # def editors << (user)
  #       self.editors << unless document_editors.find_by(user_id: user.id)
  # end

  def owner=(user)
    de = document_editor_owner
    if de
      return user if de == user
      de.set_owner(false)
    end

    de = document_editors.find_by(user_id: user.id)
    if de.nil?
      self.editors << user
      de = document_editors.find_by(user_id: user.id)
    end
    de.set_owner(true)
  end

  def status
    return FINAL if self.final.attached?
    cf_size = content_field_ids.size
    return BEING_PREPARED if cf_size == 0

    case content_fields.where(contentable_type: "SentinelBlock").size
    when 0
      COMPLETE
    when (1...cf_size)
      IN_PROGRESS
    else
      BEING_PREPARED
    end
  end

  private

  def document_editor_owner
    document_editors.find_by(is_owner: true)
  end

  def aws_client
    @s3 = Aws::S3::Resource.new(region: ENV["AWS_REGION"])
  end

  def bucket
    client = @s3 || aws_client
    if Rails.env.production?
      return client.bucket(ENV["S3_BUCKET_NAME"])
    else
      return client.bucket(Rails.application.credentials.aws.dev.bucket)
    end
  end
end
