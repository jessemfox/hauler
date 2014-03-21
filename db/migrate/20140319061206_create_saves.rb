class CreateSaves < ActiveRecord::Migration
  def change
    create_table :saves do |t|
      t.integer :haul_id, null: false
      t.integer :user_id, null: false
      t.timestamps
    end
    add_index :saves, :haul_id
    add_index :saves, :user_id
  end
end
