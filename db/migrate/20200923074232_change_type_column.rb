class ChangeTypeColumn < ActiveRecord::Migration[5.2]
  def change
    rename_column :text_blocks, :type, :text_type
  end
end
