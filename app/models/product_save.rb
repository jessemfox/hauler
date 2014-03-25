# == Schema Information
#
# Table name: product_saves
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  product_id :integer
#  created_at :datetime
#  updated_at :datetime
#

class ProductSave < ActiveRecord::Base
  validates :user_id, :product_id, presence: true
  
  belongs_to :user
  
  belongs_to :product


end
