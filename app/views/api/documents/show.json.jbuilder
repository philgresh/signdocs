json.key_format! camelize: :lower

json.document do
  json.partial! "api/documents/document", document: @document
  json.file_url @document.file.attached? ? polymorphic_url(@document.file) : nil
  if @file
    json.download_url @file.attached? ? rails_blob_url(@file, disposition: "attachment") : nil
    json.preview_image_url rails_blob_url(@file.preview(thumbnail: "300").processed.image)
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
    json.set! sig.user_id do
      json.partial! "api/signature_blocks/signature", sig: sig
    end
  end
end