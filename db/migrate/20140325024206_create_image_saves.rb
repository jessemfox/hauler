class CreateImageSaves < ActiveRecord::Migration
  def change
    create_table :image_saves do |t|
      t.integer :user_id
      t.integer :post_image_id
      t.timestamps
    end
    add_index :image_saves, :user_id
    add_index :image_saves, :post_image_id
  end
end
