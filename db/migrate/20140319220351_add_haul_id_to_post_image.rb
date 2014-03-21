class AddHaulIdToPostImage < ActiveRecord::Migration
  def change
    add_column :post_images, :haul_id, :integer
  end
end
