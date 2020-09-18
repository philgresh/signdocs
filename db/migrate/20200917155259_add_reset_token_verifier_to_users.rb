class AddResetTokenVerifierToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :reset_token_verifier, :string
    add_index :users, :reset_token
  end
end
