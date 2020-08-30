# == Schema Information
#
# Table name: signature_blocks
#
#  id                  :uuid             not null, primary key
#  pub_key             :string
#  pub_key_fingerprint :string
#  styling             :json
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  user_id             :uuid             not null
#
# Indexes
#
#  index_signature_blocks_on_user_id  (user_id) UNIQUE
#
require 'rails_helper'

RSpec.describe Signature, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
