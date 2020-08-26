# == Schema Information
#
# Table name: document_editors
#
#  id          :uuid             not null, primary key
#  is_owner    :boolean          default(FALSE), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  document_id :uuid             not null
#  user_id     :uuid             not null
#
# Indexes
#
#  index_document_editors_on_document_id  (document_id)
#  index_document_editors_on_user_id      (user_id)
#
class DocumentEditor < ApplicationRecord
  belongs_to :document
  belongs_to :user

  def set_owner(bool = true)
    self.is_owner = bool
    self.save
  end
end
