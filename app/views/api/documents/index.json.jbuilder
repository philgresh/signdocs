json.key_format! camelize: :lower

json.documents do
  @documents.each do |doc|
    json.set! doc.id do
      json.partial! "api/documents/document", document: doc
    end
  end
end
json.users do
  @editors.each do |editor|
    json.set! editor.id do
      json.partial! 'api/users/user', user: editor
    end
  end
end