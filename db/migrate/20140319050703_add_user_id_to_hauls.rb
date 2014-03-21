class AddUserIdToHauls < ActiveRecord::Migration
  def change
    add_column  :hauls, :owner_id, :integer
    add_index :hauls, :owner_id
  end
end
