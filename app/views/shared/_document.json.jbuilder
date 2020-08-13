json.extract! document, :id, :owner_id, :editor_ids, :title, :description
json.image_url url_for(document.file)