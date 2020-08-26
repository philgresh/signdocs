json.key_format! camelize: :lower
json.extract! content_field, :id, :bbox, :assignee_id
json.doc_id content_field.document_id
if content_field.contentable_type == "SentinelBlock"
  json.type "UNFILLED_#{content_field.contentable.block_type}"
else
  json.type "FILLED_#{content_field.contentable.block_type}"
  json.contentable_id content_field.contentable_id
end