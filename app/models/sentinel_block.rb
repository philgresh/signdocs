# == Schema Information
#
# Table name: sentinel_blocks
#
#  id         :uuid             not null, primary key
#  block_type :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class SentinelBlock < ApplicationRecord
  validates :block_type, inclusion: {in: ['SIGNATURE', 'TEXT']}
  has_one :content_field, as: :contentable, dependent: :destroy
end
