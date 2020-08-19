json.key_format! camelize: :lower
json.extract! user, :id, :email, :first_name, :last_name
json.image_tag user.avatar.attached? ? url_for(user.avatar) : nil
