json.user do
  json.partial! "api/users/user", user: @user
end
json.signature do
  json.partial! "api/signature_blocks/signature", sig: @user.signature
end
json.documents do
  @documents && @documents.each do |doc|
    json.set! doc.id do
      json.partial! "api/documents/document", document: doc
    end
  end
end
