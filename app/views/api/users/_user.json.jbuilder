json.key_format! camelize: :lower
json.user do
  json.extract! user, :id, :email, :first_name, :last_name
end
