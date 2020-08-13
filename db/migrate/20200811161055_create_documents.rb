class CreateDocuments < ActiveRecord::Migration[5.2]
  def change
    create_table :documents, id: :uuid  do |t|
      t.uuid    :owner_id, null: false
      t.uuid    :editor_ids, array: true, using: 'gin'
      t.string  :title, null: false
      t.text    :description
      t.timestamps
    end
    add_index :documents, :owner_id
  end
end
