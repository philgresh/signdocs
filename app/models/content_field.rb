# frozen_string_literal: true

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
class ContentField < ApplicationRecord
  validates_presence_of :signatory_id, :bbox
  belongs_to :contentable, polymorphic: true
  validates_presence_of :signatory_id, :bbox
  belongs_to :document
  belongs_to :signatory,
             class_name: :User

  def contentable_type=(class_name)
    super(class_name.constantize.base_class.to_s)
  end
end
