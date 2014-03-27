json.users @users do |user|
	json.id user.id
	json.email user.email
	json.imageT photo_url_for(user, :thumbnail)
end