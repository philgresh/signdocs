class CreateDocumentChanges < ActiveRecord::Migration[5.2]
  def change
    create_table :document_changes do |t|
      t.string :change_operation, null: false
      t.references :changeable, polymorphic: true
      t.uuid :user_id, null: false
      t.json :changes, null: false
      t.timestamps
    end
  end
end
