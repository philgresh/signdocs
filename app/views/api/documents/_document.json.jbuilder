json.key_format! camelize: :lower
json.extract! document, :id, :editor_ids, :title, :description
json.file_url url_for(document.file)