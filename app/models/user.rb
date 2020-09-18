# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                   :uuid             not null, primary key
#  email                :string           not null
#  first_name           :string           not null
#  last_name            :string           not null
#  password_digest      :string           not null
#  reset_token          :string
#  reset_token_exp      :integer
#  reset_token_verifier :string
#  session_token        :string           not null
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#
# Indexes
#
#  index_users_on_email          (email) UNIQUE
#  index_users_on_reset_token    (reset_token)
#  index_users_on_session_token  (session_token) UNIQUE
#

require "digest"
require "securerandom"

class User < ApplicationRecord
  validates :email, :session_token, presence: true, uniqueness: true
  validates :password_digest, :first_name, :last_name, presence: true
  validates :password, length: {
                         minimum: 6,
                         maximum: 64,
                         allow_nil: true,
                         too_long: "%{count} characters is the maximum allowed",
                       }

  attr_reader :password
  before_validation :ensure_session_token
  before_create :downcase_fields
  after_create :create_signature

  # ActiveStorage associations

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
           foreign_key: :signatory_id

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
    self.save
    new_st
  end

  def full_name
    "#{self.first_name} #{self.last_name}"
  end

  def create_password_reset_token
    reset_token = SecureRandom.random_bytes(20)
    reset_token_verifier = SecureRandom.random_bytes(20)
    reset_string = Base64.urlsafe_encode64(reset_token + reset_token_verifier)
    # url = "https://signdocs.herokuapp.com/#/reset/#{reset_string}"

    self.reset_token = Base64.urlsafe_encode64(reset_token, padding: false)
    self.reset_token_verifier = Digest::SHA256.hexdigest reset_token_verifier
    self.reset_token_exp = 36.hours.from_now.to_i
    return reset_string
  end

  def clear_password_reset_token
    self.reset_token = nil
    self.reset_token_exp = nil
    self.reset_token_verifier = nil
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
end
