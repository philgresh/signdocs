json.key_format! camelize: :lower
json.extract! content_field, :id, :assignee_id
json.doc_id content_field.document_id
if content_field.contentable_type == "SentinelBlock"
  json.type "UNFILLED_#{content_field.contentable.block_type}"
else
  json.type "FILLED_#{content_field.contentable.block_type}"
  json.contentable_id content_field.contentable_id
end
json.bbox do
  json.x content_field.bbox["x"].to_i
  json.y content_field.bbox["y"].to_i
  json.width content_field.bbox["width"].to_i
  json.height content_field.bbox["height"].to_i
  json.page content_field.bbox["page"].to_i
end