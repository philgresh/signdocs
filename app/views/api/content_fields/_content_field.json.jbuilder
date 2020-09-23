json.key_format! camelize: :lower
json.extract! content_field, :id, :signatory_id
json.doc_id content_field.document_id
if content_field.contentable_type == "SentinelBlock"
  json.type "UNFILLED_#{content_field.contentable.block_type}"
  json.placeholder content_field.contentable.placeholder
else
  json.type "FILLED_#{content_field.contentable.block_type}"
  json.contentable_id content_field.contentable.id
  if content_field.contentable.block_type != "SIGNATURE"
    json.placeholder content_field.contentable.text_type
    json.body content_field.contentable.body
  end
end
json.bbox do
  json.x content_field.bbox["x"].to_f
  json.y content_field.bbox["y"].to_f
  json.widthPct content_field.bbox["width_pct"].to_f
  json.aspectRatio content_field.bbox["aspect_ratio"].to_f
  json.page content_field.bbox["page"].to_i
end
