# == Schema Information
#
# Table name: documents
#
#  id          :uuid             not null, primary key
#  description :text
#  editor_ids  :uuid             is an Array
#  title       :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  owner_id    :uuid             not null
#
# Indexes
#
#  index_documents_on_owner_id  (owner_id)
#
FactoryBot.define do
  factory :document do
    
  end
end
