class AddCoverPhotoToHaul < ActiveRecord::Migration
  def self.up
    add_attachment :hauls, :cover_photo
  end

  def self.down
    remove_attachment :hauls, :cover_photo
  end
end
