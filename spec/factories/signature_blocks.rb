# == Schema Information
#
# Table name: signature_blocks
#
#  id         :bigint           not null, primary key
#  body       :string           not null
#  pub_key    :string
#  styling    :json
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :uuid             not null
#
# Indexes
#
#  index_signature_blocks_on_user_id  (user_id) UNIQUE
#
FactoryBot.define do
  factory :signature do
    
  end
end
