# == Schema Information
#
# Table name: text_blocks
#
#  id         :uuid             not null, primary key
#  body       :text             not null
#  styling    :json
#  text_type  :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :uuid             not null
#
# Indexes
#
#  index_text_blocks_on_user_id  (user_id)
#
class TextBlock < ApplicationRecord
  validates_presence_of :body, :text_type, :user_id
  has_one :content_fields, as: :contentable

  def block_type
    "TEXT"
  end
end
