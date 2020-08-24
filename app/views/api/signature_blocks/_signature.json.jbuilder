json.key_format! camelize: :lower
json.extract! sig, :id, :styling, :user_id, :pub_key_fingerprint
json.image_url polymorphic_url(sig.sig_image)
