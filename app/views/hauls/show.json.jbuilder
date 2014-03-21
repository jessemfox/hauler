json.(@haul, :id, :title, :description, :owner_id)
json.postImages @postImages do |postImage|
	json.url postImage.photo.url(:browser)
	json.haul postImage.haul_id
	json.owner @haul.owner_id
end