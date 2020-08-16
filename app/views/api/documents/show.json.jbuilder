json.key_format! camelize: :lower

json.document do
  json.partial! "api/documents/document", document: @document
end
json.users do
  @editors.each do |editor|
    json.set! editor.id do
      json.partial! 'api/users/user', user: editor
    end
  end
end