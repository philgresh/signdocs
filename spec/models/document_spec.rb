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
require 'rails_helper'

RSpec.describe Document, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
