# == Schema Information
#
# Table name: content_fields
#
#  id               :uuid             not null, primary key
#  bbox             :json             not null
#  contentable_type :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  contentable_id   :uuid
#  document_id      :uuid             not null
#  signatory_id     :uuid             not null
#
# Indexes
#
#  index_content_fields_on_contentable_type_and_contentable_id  (contentable_type,contentable_id)
#  index_content_fields_on_document_id                          (document_id)
#  index_content_fields_on_signatory_id                         (signatory_id)
#
require 'rails_helper'

RSpec.describe ContentField, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
