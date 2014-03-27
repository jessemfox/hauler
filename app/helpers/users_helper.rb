module UsersHelper
  def photo_url_for(user, type)
    if user.has_default_photo?
      asset_url(user.photo.url(type))
    else
      user.photo.url(type)
    end
  end
end
