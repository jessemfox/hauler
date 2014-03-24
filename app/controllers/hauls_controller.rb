class HaulsController < ApplicationController


  def index
    Haul.all
  end
  
  def create
    @haul = Haul.new(haul_params)
    if @haul.save
      render json: @haul
    else
      render :json => @haul.errors, :status => :unprocessable_entity
    end
  end

  def show
    @haul = Haul.find(params[:id])
    @postImages = @haul.post_images
    @products = @haul.products
    #make jbuilder later
    render "hauls/show"
  end

  private
  
  def haul_params
    params.require(:haul).permit(:owner_id, :description, :title, :cover_photo)
  end

end
