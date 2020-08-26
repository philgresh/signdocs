class CreateDocumentEditors < ActiveRecord::Migration[5.2]
  def change
    create_table :document_editors, id: :uuid  do |t|
      t.uuid :document_id, null: false
      t.uuid :user_id, null: false
      t.boolean :is_owner, :null => false, :default => false
      t.timestamps
      t.index :document_id
      t.index :user_id
    end
  end
end

