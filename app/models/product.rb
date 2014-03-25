# == Schema Information
#
# Table name: products
#
#  id                 :integer          not null, primary key
#  photo_file_name    :string(255)
#  photo_content_type :string(255)
#  photo_file_size    :integer
#  photo_updated_at   :datetime
#  haul_id            :integer
#  price              :decimal(, )
#  url                :string(255)
#  created_at         :datetime
#  updated_at         :datetime
#

class Product < ActiveRecord::Base
  
  has_attached_file :photo, :styles => {:browser => '220x220#' }
  validates_attachment_content_type :photo, :content_type => /\Aimage/
   
  
  belongs_to :haul
  delegate :owner, to: :haul
  
  has_many :saves, class_name: 'ProductSave', foreign_key: :product_id
  
  has_many :savers, through: :saves, source: :user
  
end
