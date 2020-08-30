class CreateSignatureBlocks < ActiveRecord::Migration[5.2]
  def change
    create_table :signature_blocks, id: :uuid do |t|
      t.uuid :user_id, null: false
      t.json :styling
      t.string :pub_key
      t.string :pub_key_fingerprint
      t.timestamps
    end
    add_index :signature_blocks, :user_id, unique: true
  end
end