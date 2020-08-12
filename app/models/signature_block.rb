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
#  user_id    :integer          not null
#
# Indexes
#
#  index_signature_blocks_on_user_id  (user_id) UNIQUE
#
class SignatureBlock < ApplicationRecord
  validates_presence_of :body, :user_id
  has_many :content_fields, as: :contentable
  belongs_to :user
end
