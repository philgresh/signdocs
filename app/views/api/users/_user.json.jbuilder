json.key_format! camelize: :lower
json.extract! user, :id, :email, :first_name, :last_name
json.image_tag user.avatar.attached? ? polymorphic_url(user.avatar) : nil
