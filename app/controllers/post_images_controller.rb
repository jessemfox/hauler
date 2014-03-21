class PostImagesController < ApplicationController

  def create
    
    @post_image = PostImage.new(post_image_params)
    @haul = Haul.find(@post_image.haul_id)
    if @post_image.save
      render "pimages/image"
    else
 
      render :json => @post_image.errors, :status => :unprocessable_entity
    end
  end

  private
  
  def post_image_params
    params.require(:post_image).permit(:photo, :haul_id)
  end

end
