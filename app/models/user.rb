# == Schema Information
#
# Table name: users
#
#  id              :uuid             not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  first_name      :string           not null
#  last_name       :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  validates :username, :session_token, presence: true, uniqueness: true
  validates :password_digest, :first_name, :last_name, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  attr_reader :password
  before_validation :ensure_session_token

  def self.find_by_credentials(username, password)
    @user = User.find_by(username: username)
    if @user && @user.is_password?(password)
      @user
    else
      nil
    end
  end

  def password=(pw)
    @password = pw
    self.password_digest = BCrypt::Password.create(pw)
  end

  def is_password?(pw)
    BCrypt::Password.new(self.password_digest).is_password?(pw)
  end

  def reset_session_token!
    new_st = SecureRandom::urlsafe_base64
    self.session_token = new_st
    self.save
    new_st
  end

  private

  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64
  end
end
