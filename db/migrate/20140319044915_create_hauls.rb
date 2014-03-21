class CreateHauls < ActiveRecord::Migration
  def change
    create_table :hauls do |t|
      t.string :title
      t.text :description
      t.timestamps
    end
  end
end
