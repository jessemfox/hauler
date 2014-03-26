json.users @users do |user|
	json.id user.id
	json.email user.email
	json.imageT user.photo.url(:thumbnail)

end