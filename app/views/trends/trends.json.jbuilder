json.hauls @hauls do |haul|
	json.title haul.title
	json.description haul.description
	json.image haul.cover_photo.url(:browser)
	json.owner haul.owner_id
	json.id haul.id

end