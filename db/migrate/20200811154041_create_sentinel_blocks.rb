# frozen_string_literal: true

class CreateSentinelBlocks < ActiveRecord::Migration[5.2]
  def change
    create_table :sentinel_blocks do |t|
      t.integer :user_id, null: false
      t.string :type, null: false
      t.string :placeholder, null: false
      t.timestamps
    end
    add_index :sentinel_blocks, :user_id
  end
end
