# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
# HAUL_IDS = [1,2,3,4,5]
# 
# ActiveRecord::Base.transaction do
#   
#   users = []
#   
#   1000.times do |i|
#     users << [Faker::Internet.email ]
#   end
#   
#   User.import(
#   [ 'email'],
#   users,
#   :validate => false
#   )
#   
#   hauls = []
#   
#   User.all.each do |u|
#     20.times do |i|
#       hauls << ['product', u.id]
#     end
#   end
#   
#   Haul.import(
#   ['title', 'owner_id'],
#   hauls,
#   validate: false
#   )
#   
#   user_ids = User.pluck(:id)
#   saves = []
#   
#   1000.times do |i|
#     saves << [user_ids.sample, HAUL_IDS.sample]
#   end
#   
#   Save.import(
#   ['user_id', 'haul_id'],
#   saves,
#   validate: false
#   
#   )
#   
#   follows = []
#   1000.times do |i|
#     follows << [user_ids.sample, user_ids.sample]
#   end
#   
#   Relationship.import(
#   ['follower_id', "followed_id"],
#   follows,
#   validate: false
#   )
#   
#   
#   
#   
#   
# end