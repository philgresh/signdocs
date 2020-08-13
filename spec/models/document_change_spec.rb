# == Schema Information
#
# Table name: document_changes
#
#  id               :bigint           not null, primary key
#  change_operation :string           not null
#  changeable_type  :string
#  changes          :json             not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  changeable_id    :bigint
#  user_id          :uuid             not null
#
# Indexes
#
#  index_document_changes_on_changeable_type_and_changeable_id  (changeable_type,changeable_id)
#
require 'rails_helper'

RSpec.describe DocumentChange, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
