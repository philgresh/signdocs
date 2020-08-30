# frozen_string_literal: true

class CreateSentinelBlocks < ActiveRecord::Migration[5.2]
  def change
    create_table :sentinel_blocks, id: :uuid  do |t|
      t.string :block_type, null: false
      t.string :placeholder
      t.timestamps
    end
  end
end
