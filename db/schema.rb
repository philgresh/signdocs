# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_09_23_074232) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "content_fields", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "document_id", null: false
    t.uuid "signatory_id", null: false
    t.uuid "contentable_id"
    t.string "contentable_type"
    t.json "bbox", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["contentable_type", "contentable_id"], name: "index_content_fields_on_contentable_type_and_contentable_id"
    t.index ["document_id"], name: "index_content_fields_on_document_id"
    t.index ["signatory_id"], name: "index_content_fields_on_signatory_id"
  end

  create_table "document_editors", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "document_id", null: false
    t.uuid "user_id", null: false
    t.boolean "is_owner", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["document_id"], name: "index_document_editors_on_document_id"
    t.index ["user_id"], name: "index_document_editors_on_user_id"
  end

  create_table "documents", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "title", null: false
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sentinel_blocks", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "block_type", null: false
    t.string "placeholder"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "signature_blocks", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id", null: false
    t.json "styling"
    t.string "pub_key"
    t.string "pub_key_fingerprint"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_signature_blocks_on_user_id", unique: true
  end

  create_table "text_blocks", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id", null: false
    t.string "text_type", null: false
    t.text "body", null: false
    t.json "styling"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_text_blocks_on_user_id"
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "reset_token"
    t.integer "reset_token_exp"
    t.string "reset_token_verifier"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_token"], name: "index_users_on_reset_token"
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
end
