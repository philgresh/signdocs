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
FactoryBot.define do
  factory :sentinel_block do
    
  end
end
