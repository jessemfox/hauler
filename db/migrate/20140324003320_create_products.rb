class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.attachment :photo
      t.integer :haul_id
      t.decimal :price
      t.string :url
      t.timestamps
    end
    add_index :products, :haul_id
  end
end
