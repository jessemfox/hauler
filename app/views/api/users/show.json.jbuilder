json.email @user.email
json.id @user.id
json.imageB photo_url_for(@user, :browser)
json.imageT photo_url_for(@user, :thumbnail)

json.hauls @hauls do |haul|
	json.title haul.title
	json.description haul.description
	json.image haul.cover_photo.url(:browser)
	json.owner haul.owner_id
	json.id haul.id
	json._products haul.products.length
	json._post_images haul.post_images.length
end

json.saved_images @saved_images do |saved_image|
	json.url saved_image.photo.url(:browser)
	json.haul saved_image.haul_id
	json.owner saved_image.owner.id
end

json.saved_products @saved_products do |saved_product|
	json.url saved_product.url
	json.price saved_product.price
	json.haul saved_product.haul_id
	json.image saved_product.photo.url(:browser)
	json.owner saved_product.owner.id
end

json.followers @followers do |follower|
	
	json.email follower.email
	json.id follower.id

end

json.followed_users @followed_users do |followed_user|
	json.email followed_user.email
	json.id followed_user.id
end