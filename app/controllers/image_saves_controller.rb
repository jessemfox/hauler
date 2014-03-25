class ImageSavesController < ApplicationController

  def create
    @image_save = ImageSave.new(img_save_params)
    if @image_save.save
      render :json => @image_save
    else
      render @image_save.errors
    end
  end

  private
  
  def img_save_params
    params.require(:image_save).permit(:user_id, :post_image_id)
  end

end
