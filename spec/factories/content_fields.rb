# == Schema Information
#
# Table name: content_fields
#
#  id               :uuid             not null, primary key
#  bbox             :json             not null
#  contentable_type :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  assignee_id      :uuid             not null
#  contentable_id   :uuid
#  document_id      :uuid             not null
#
# Indexes
#
#  index_content_fields_on_assignee_id                          (assignee_id)
#  index_content_fields_on_contentable_type_and_contentable_id  (contentable_type,contentable_id)
#  index_content_fields_on_document_id                          (document_id)
#
FactoryBot.define do
  factory :content_field do
    
  end
end
