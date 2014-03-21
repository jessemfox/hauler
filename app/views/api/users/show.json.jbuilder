json.(@user, :email, :id)

json.hauls @hauls do |haul|
	json.title haul.title
end

json.saved_hauls @saved_hauls do |saved_haul|
	json.title saved_haul.title
end

json.followers @followers do |follower|
	
	json.email follower.email

end

json.followed_users @followed_users do |followed_user|
	json.email followed_user.email
end