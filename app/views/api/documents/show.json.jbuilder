json.key_format! camelize: :lower

json.document do
  json.partial! "api/documents/document", document: @document
  json.file_url @document.file.attached? ? polymorphic_url(@document.file) : nil
  json.download_url @document.file.attached? ? rails_blob_url(@document.file, disposition: "attachment") : nil
  json.preview_image_url rails_blob_url(@document.blob.preview(resize: "200x200>").processed.image)
  json.content_fields_count @document.content_fields.size
end
json.users do
  @users.each do |user|
    json.set! user.id do
      json.partial! "api/users/user", user: user
    end
  end
end
