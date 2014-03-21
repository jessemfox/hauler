class CreatePostImages < ActiveRecord::Migration
  def change
    create_table :post_images do |t|
      t.attachment :photo
      t.timestamps
    end
  end
end
