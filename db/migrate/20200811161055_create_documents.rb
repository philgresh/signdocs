class CreateDocuments < ActiveRecord::Migration[5.2]
  def change
    create_table :documents do |t|
      t.integer :file_id, null: false
      t.integer :owner_id, null: false
      t.integer :editor_ids, array: true, using: 'gin'
      t.timestamps
    end
    add_index :documents, :file_id, unique: true
    add_index :documents, :owner_id
  end
end
