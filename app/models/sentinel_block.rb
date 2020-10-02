# == Schema Information
#
# Table name: sentinel_blocks
#
#  id          :uuid             not null, primary key
#  block_type  :string           not null
#  placeholder :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class SentinelBlock < ApplicationRecord
  validates :block_type, inclusion: { in: ["SIGNATURE", "TEXT"] }
  has_one :content_field, as: :contentable, dependent: :nullify

  def self.setup_default(type)
    block_type = type
    placeholder = type == "TEXT" ? "CURRENT_DATE" : nil

    sentinel = SentinelBlock.create(
      block_type: block_type,
      placeholder: placeholder,
    )
  end
end
