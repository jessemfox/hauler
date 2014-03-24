json.(@user, :email, :id)

json.hauls @hauls do |haul|
	json.title haul.title
	json.description haul.description
	json.image haul.cover_photo.url(:browser)
	json.owner haul.owner_id
	json.id haul.id
end

json.saved_hauls @saved_hauls do |saved_haul|
	json.title saved_haul.title
end

json.followers @followers do |follower|
	
	json.email follower.email
	json.id follower.id

end

json.followed_users @followed_users do |followed_user|
	json.email followed_user.email
	json.id followed_user.id
end