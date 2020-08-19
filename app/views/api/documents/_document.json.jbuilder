json.key_format! camelize: :lower
json.extract! document, :id, :editor_ids, :title, :description, :updated_at
json.file_url document.file.attached? ? url_for(document.file) : nil
json.download_link document.file.attached? ? rails_blob_url(document.file, disposition: "attachment") : nil
json.content_fields_count document.content_fields.size
json.owner_id document.owner ? document.owner.id : nil
