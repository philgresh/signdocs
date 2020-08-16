json.key_format! camelize: :lower
json.extract! document, :id, :editor_ids, :title, :description
json.file_url document.file.attached? ? url_for(document.file) : nil
