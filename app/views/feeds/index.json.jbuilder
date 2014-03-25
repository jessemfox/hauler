json.hauls @hauls do |haul|
	json.image haul.cover_photo.url(:browser)
	json.owner haul.owner_id
	json.id haul.id
	json.title haul.title
	json.description haul.description
	json._products haul.products.length
	json._post_images haul.post_images.length

end