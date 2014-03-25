# == Schema Information
#
# Table name: post_images
#
#  id                 :integer          not null, primary key
#  photo_file_name    :string(255)
#  photo_content_type :string(255)
#  photo_file_size    :integer
#  photo_updated_at   :datetime
#  created_at         :datetime
#  updated_at         :datetime
#  haul_id            :integer
#

class PostImage < ActiveRecord::Base

  
  
    
  has_attached_file :photo, :styles => {:browser => '220x220#' }
  validates_attachment_content_type :photo, :content_type => /\Aimage/
  # validates_attachment :photo,
#     :content_type => { :content_type => ["image/jpg", "image/gif", "image/png"] }
#     
  
  belongs_to :haul
  delegate :owner, to: :haul
  
  has_many :saves, :class_name => :image_save, :foreign_key => :post_image_id
  
  has_many :savers, through: :saves, source: :user
  
end
