json.key_format! camelize: :lower
json.set! @document.id do
    json.partial! 'shared/document', document: @document
end