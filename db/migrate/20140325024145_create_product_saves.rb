class CreateProductSaves < ActiveRecord::Migration
  def change
    create_table :product_saves do |t|
      t.integer :user_id
      t.integer :product_id
      t.timestamps
    end
    add_index :product_saves, :user_id
    add_index :product_saves, :product_id
  end
end
