# frozen_string_literal: true

class CreateTextBlocks < ActiveRecord::Migration[5.2]
  def change
    create_table :text_blocks, id: :uuid  do |t|
      t.uuid :user_id, null: false
      t.string :type, null: false
      t.text :body, null: false
      t.json :styling
      t.timestamps
    end
    add_index :text_blocks, :user_id
  end
end
