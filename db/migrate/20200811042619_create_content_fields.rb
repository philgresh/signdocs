# frozen_string_literal: true

class CreateContentFields < ActiveRecord::Migration[5.2]
  def change
    create_table :content_fields do |t|
      t.integer :document_id, null: false
      t.integer :contentable_id, null: false
      t.string :contentable_type, null: false
      t.integer :assignee_id, null: false
      t.json :bbox, null: false
      t.timestamps
    end
    add_index :content_fields, :document_id
    add_index :content_fields, %i[contentable_type contentable_id]
    add_index :content_fields, :assignee_id
  end
end
