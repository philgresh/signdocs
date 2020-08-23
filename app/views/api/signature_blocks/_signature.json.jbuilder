json.key_format! camelize: :lower
json.signature do
  json.id sig.user.id
  json.extract! sig, :body, :pub_key, :styling
end