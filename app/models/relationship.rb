# == Schema Information
#
# Table name: relationships
#
#  id          :integer          not null, primary key
#  follower_id :integer          not null
#  followed_id :integer          not null
#  created_at  :datetime
#  updated_at  :datetime
#

class Relationship < ActiveRecord::Base
  
  validates :follower_id, :followed_id, presence: true
  validates_uniqueness_of :follower_id, scope: :followed_id
  
  belongs_to :follower, :class_name => 'User', :foreign_key => :follower_id
  belongs_to :followed, :class_name => 'User', :foreign_key => :followed_id
  
end
