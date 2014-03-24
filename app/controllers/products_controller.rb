class ProductsController < ApplicationController

  def create
    
    @product = PostImage.new(product_params)
    @haul = Haul.find(@product.haul_id)
    if @product.save
      #render something that i'll deal with later
    else
 
      render :json => @product.errors, :status => :unprocessable_entity
    end
  end

  private
  
  def product_params
    params.require(:product).permit(:photo, :haul_id, :url, :price)
  end

end
