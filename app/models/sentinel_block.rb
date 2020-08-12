# == Schema Information
#
# Table name: sentinel_blocks
#
#  id          :bigint           not null, primary key
#  placeholder :string           not null
#  type        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :integer          not null
#
# Indexes
#
#  index_sentinel_blocks_on_user_id  (user_id)
#
class SentinelBlock < ApplicationRecord
  validates_presence_of :placeholder, :type, :user_id
  has_many :content_fields, as: :contentable
  belongs_to :user
end
