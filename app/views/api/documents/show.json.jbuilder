json.key_format! camelize: :lower

json.document do
  json.partial! "api/documents/document", document: @document
  json.file_url @file.attached? ? polymorphic_url(@file) : nil
  if @file && @file.attached?
    json.download_url rails_blob_url(@file, disposition: "attachment")
    json.preview_image_url @file.previewable? ? rails_blob_url(@file.preview(thumbnail: "300").processed.image) : ""
  end
  json.content_fields_count @document.content_fields.size
end
json.users do
  @users.each do |user|
    json.set! user.id do
      json.partial! "api/users/user", user: user
    end
  end
end
json.signatures do
  @document.signatures.each do |sig|
    json.set! sig.id do
      json.partial! "api/signature_blocks/signature", sig: sig
    end
  end
end
json.content_fields do
  @contentables.each do |content_field|
    json.set! content_field.id do
      json.partial! "api/content_fields/content_field", content_field: content_field
    end
  end
end
