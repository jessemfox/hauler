json.(@haul, :id, :title, :description, :owner_id)
json.postImages @postImages do |postImage|
	json.url postImage.photo.url(:browser)
	json.haul postImage.haul_id
	json.owner @haul.owner_id
	json.id postImage.id
end

json.products @products do |product|
	json.url product.url
	json.image product.photo.url(:browser)
	json.haul product.haul_id
	json.owner @haul.owner_id
	json.price product.price
	json.id product.id

end