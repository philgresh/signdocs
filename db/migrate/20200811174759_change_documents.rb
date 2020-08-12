class ChangeDocuments < ActiveRecord::Migration[5.2]
  def change
    remove_column :documents, :file_id
  end
end
