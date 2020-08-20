json.key_format! camelize: :lower
json.extract! document, :id, :title, :description, :updated_at
# json.file_url document.file.attached? ? polymorphic_url(document.file) : nil
# json.download_url document.file.attached? ? rails_blob_url(document.file, disposition: "attachment") : nil
# json.content_fields_count document.content_fields.size
json.owner_id document.owner ? document.owner.id : nil
json.editor_ids document.editors ? (document.editor_ids - [document.owner.id]) : []
