# == Schema Information
#
# Table name: image_saves
#
#  id            :integer          not null, primary key
#  user_id       :integer
#  post_image_id :integer
#  created_at    :datetime
#  updated_at    :datetime
#

class ImageSave < ActiveRecord::Base
  validates :user_id, :post_image_id, presence: true
  
  belongs_to :user
  
  belongs_to :post_image, class_name: 'PostImage', foreign_key: :post_image_id 

end
