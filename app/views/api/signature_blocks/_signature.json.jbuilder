json.key_format! camelize: :lower
json.extract! sig, :id, :styling, :user_id
json.image_url polymorphic_url(sig.sig_image)
json.pub_key sig.fetch_pub_key(true)
