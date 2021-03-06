# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20140326052845) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "haul_items", force: true do |t|
    t.integer  "haul_id",       null: false
    t.integer  "itemable_id",   null: false
    t.string   "itemable_type", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "haul_items", ["haul_id"], name: "index_haul_items_on_haul_id", using: :btree

  create_table "hauls", force: true do |t|
    t.string   "title"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "owner_id"
    t.string   "cover_photo_file_name"
    t.string   "cover_photo_content_type"
    t.integer  "cover_photo_file_size"
    t.datetime "cover_photo_updated_at"
  end

  add_index "hauls", ["owner_id"], name: "index_hauls_on_owner_id", using: :btree

  create_table "image_saves", force: true do |t|
    t.integer  "user_id"
    t.integer  "post_image_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "image_saves", ["post_image_id"], name: "index_image_saves_on_post_image_id", using: :btree
  add_index "image_saves", ["user_id"], name: "index_image_saves_on_user_id", using: :btree

  create_table "post_images", force: true do |t|
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.integer  "photo_file_size"
    t.datetime "photo_updated_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "haul_id"
  end

  create_table "product_saves", force: true do |t|
    t.integer  "user_id"
    t.integer  "product_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "product_saves", ["product_id"], name: "index_product_saves_on_product_id", using: :btree
  add_index "product_saves", ["user_id"], name: "index_product_saves_on_user_id", using: :btree

  create_table "products", force: true do |t|
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.integer  "photo_file_size"
    t.datetime "photo_updated_at"
    t.integer  "haul_id"
    t.decimal  "price"
    t.string   "url"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "products", ["haul_id"], name: "index_products_on_haul_id", using: :btree

  create_table "relationships", force: true do |t|
    t.integer  "follower_id", null: false
    t.integer  "followed_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "relationships", ["followed_id"], name: "index_relationships_on_followed_id", using: :btree
  add_index "relationships", ["follower_id"], name: "index_relationships_on_follower_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.integer  "photo_file_size"
    t.datetime "photo_updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
