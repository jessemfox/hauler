# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  email                  :string(255)      default(""), not null
#  encrypted_password     :string(255)      default(""), not null
#  reset_password_token   :string(255)
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string(255)
#  last_sign_in_ip        :string(255)
#  created_at             :datetime
#  updated_at             :datetime
#

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
      
         
         
  

  has_many :follows, :class_name => 'Relationship', :foreign_key => :follower_id,
  dependent: :destroy

  has_many :followed_users, through: :follows, source: :followed

  has_many :following, :class_name => 'Relationship', :foreign_key => :followed_id,
  dependent: :destroy

  has_many :followers, through: :following, source: :follower

  has_many :hauls, :class_name => 'Haul', :foreign_key => :owner_id

  has_many :saves, :class_name => 'Save', :foreign_key => :user_id

  has_many :saved_hauls, through: :saves, source: :haul



  def following?(other_user)
    follows.find_by(followed_id: other_user.id)
  end

  def follow!(other_user)
    follows.create!(followed_id: other_user.id)
  end

  def unfollow!(other_user)
    follow = follows.find_by(followed_id: other_user.id)
    follows.find_by(followed_id: other_user.id).destroy if follow
  end
  
  def feed
    users = followed_users.pluck(:id)
    Haul.where(:owner_id => users)
  end
  
  
  
end
