# == Schema Information
#
# Table name: text_blocks
#
#  id         :bigint           not null, primary key
#  body       :text             not null
#  styling    :json
#  type       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :uuid             not null
#
# Indexes
#
#  index_text_blocks_on_user_id  (user_id)
#
class TextBlock < ApplicationRecord
  validates_presence_of :body, :type, :user_id
  has_one :content_fields, as: :contentable

end
