json.key_format! camelize: :lower
json.extract! document, :id, :title, :description, :updated_at
json.owner_id document.owner ? document.owner.id : nil
json.editor_ids document.editors ? (document.editor_ids - [document.owner.id]) : []
json.content_field_ids document.content_field_ids
json.status document.status