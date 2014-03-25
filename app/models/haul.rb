# == Schema Information
#
# Table name: hauls
#
#  id                       :integer          not null, primary key
#  title                    :string(255)
#  description              :text
#  created_at               :datetime
#  updated_at               :datetime
#  owner_id                 :integer
#  cover_photo_file_name    :string(255)
#  cover_photo_content_type :string(255)
#  cover_photo_file_size    :integer
#  cover_photo_updated_at   :datetime
#

class Haul < ActiveRecord::Base
  
  has_attached_file :cover_photo, :styles => {:browser => '220x220#' }
  validates_attachment_content_type :cover_photo, :content_type => /\Aimage/
  
  validates :owner_id, presence: true
  
  belongs_to :owner, :class_name => 'User', :foreign_key => :owner_id,
  dependent: :destroy
  
  # has_many :haul_items, :class_name => 'HaulItem', :foreign_key => :haul_id
  has_many :post_images, :class_name => 'PostImage', :foreign_key => :haul_id
  has_many :products, :class_name => 'Product', :foreign_key => :haul_id
  
  
  
  
  #trending currently gets all of the haul_ids that were created in 
  #last 24 hours and have at least 10 saves
  #eventually change this to reflect velocity
  def self.trending
    sql = <<-SQL
        
    SELECT
    hauls.*
    FROM hauls
    WHERE hauls.id IN
    
    (SELECT
      saves.haul_id
    FROM
      
      (SELECT
        hauls.id
      FROM
        hauls
      WHERE
        (LOCALTIMESTAMP - hauls.created_at) <= INTERVAL '1 DAY') AS recentHauls
      JOIN 
        saves ON recentHauls.id = saves.haul_id
      GROUP BY 
        saves.haul_id
      HAVING
        COUNT(*) > 10)
    
    SQL
    
    Haul.find_by_sql(sql).to_a
    
  end
  

  
end
