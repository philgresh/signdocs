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
require 'rails_helper'

RSpec.describe SentinelBlock, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
