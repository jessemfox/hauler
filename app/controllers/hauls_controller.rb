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
    #make jbuilder later
    render :json => @haul, include: :post_images
  end

  private
  
  def haul_params
    params.require(:haul).permit(:owner_id, :description, :title)
  end

end
