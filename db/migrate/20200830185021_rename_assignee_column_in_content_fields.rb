class RenameAssigneeColumnInContentFields < ActiveRecord::Migration[5.2]
  def change
    rename_column :content_fields, :assignee_id, :signatory_id
  end
end
