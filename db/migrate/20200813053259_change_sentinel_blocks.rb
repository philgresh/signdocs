class ChangeSentinelBlocks < ActiveRecord::Migration[5.2]
  def change
    rename_column :sentinel_blocks, :type, :block_type
  end
end
