json.key_format! camelize: :lower

json.document do
  json.partial! "api/documents/document", document: @document
end
json.users do
  @users.each do |user|
    json.set! user.id do
      json.partial! "api/users/user", user: user
    end
  end
end
