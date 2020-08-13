# == Schema Information
#
# Table name: sentinel_blocks
#
#  id          :bigint           not null, primary key
#  block_type  :string           not null
#  placeholder :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :uuid             not null
#
# Indexes
#
#  index_sentinel_blocks_on_user_id  (user_id)
#
FactoryBot.define do
  factory :sentinel_block do
    
  end
end
