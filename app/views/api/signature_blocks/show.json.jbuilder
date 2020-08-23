json.key_format! camelize: :lower

json.signature do
  json.partial! "api/signature_blocks/signature", sig: @signature
end
