# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id              :uuid             not null, primary key
#  email           :string           not null
#  first_name      :string           not null
#  last_name       :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_email          (email) UNIQUE
#  index_users_on_session_token  (session_token) UNIQUE
#
class User < ApplicationRecord
  validates :email, :session_token, presence: true, uniqueness: true
  validates :password_digest, :first_name, :last_name, presence: true
  validates :password, length: { minimum: 6, maximum: 64, allow_nil: true }

  attr_reader :password
  before_validation :ensure_session_token
  before_create :downcase_fields
  after_create :create_signature
  after_create :create_avatar

  # ActiveStorage associations
  has_one_attached :avatar

  # ActiveRecord associations
  has_one :signature,
          class_name: :SignatureBlock
  has_many :document_editors
  has_many :documents,
           through: :document_editors,
           source: :document
  has_many :text_blocks,
           dependent: :destroy
  has_many :sentinel_blocks,
           dependent: :destroy
  has_many :content_fields,
           foreign_key: :assignee_id

  def self.find_by_credentials(email, password)
    downcase_email = email.downcase
    @user = User.find_by(email: downcase_email)
    return nil if @user.nil?
    @user if @user.is_password?(password)
  end

  def password=(pw)
    @password = pw
    self.password_digest = BCrypt::Password.create(pw)
  end

  def is_password?(pw)
    BCrypt::Password.new(password_digest).is_password?(pw)
  end

  def reset_session_token!
    new_st = SecureRandom.urlsafe_base64
    self.session_token = new_st
    save
    new_st
  end

  private

  def downcase_fields
    self.email = self.email.downcase
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end

  def create_signature
    self.signature = SignatureBlock.create(user_id: self.id)
  end

  def create_avatar
    new_avatar = Faker::Avatar.image(
      slug: "#{self.first_name}_#{self.last_name}",
      size: "200x200",
      format: "png",
    )
    download = open(new_avatar)
    local_link = "#{Rails.root}/app/assets/images/#{self.id}-avatar.png"
    IO.copy_stream(download, local_link)
    self.avatar.attach(
      io: File.open(local_link),
      content_type: "image/png",
      filename: "#{self.id}-avatar.png",
      # identify: false,
    )
    self.save!
    File.delete(local_link) if File.exist?(local_link)
  end
end
