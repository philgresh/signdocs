json.set! @document.id do
    json.extract! @document
    json.image_url url_for(@document.file)
end