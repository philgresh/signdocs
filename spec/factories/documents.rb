# == Schema Information
#
# Table name: documents
#
#  id         :bigint           not null, primary key
#  editor_ids :integer          is an Array
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  owner_id   :integer          not null
#
# Indexes
#
#  index_documents_on_owner_id  (owner_id)
#
FactoryBot.define do
  factory :document do
    
  end
end
