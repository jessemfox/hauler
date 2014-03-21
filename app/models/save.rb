# == Schema Information
#
# Table name: saves
#
#  id         :integer          not null, primary key
#  haul_id    :integer          not null
#  user_id    :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

class Save < ActiveRecord::Base
  validate :haul_id, :user_id, presence: true
  validate :owner_cannot_save_own_haul

  belongs_to :user, dependent: :destroy
  belongs_to :haul, dependent: :destroy
  
  def owner_cannot_save_own_haul
    owner = Haul.find(:haul_id).owner
    if owner.id === :user_id
      errors.add(:owner_issue, "Can't save your own haul.")
    end
  end

end
