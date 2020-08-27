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
require 'rails_helper'

RSpec.describe SentinelBlock, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
