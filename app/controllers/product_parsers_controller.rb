class ProductParsersController < ApplicationController

  def create
   
    @srcs = ProductParser.getImgs(params[:url])
    render :json => @srcs
  end
  
  def encode
    
    image = ProductParser.encode64(params[:image])
    url = params[:url]
    price = params[:price]
    haul_id = params[:haul_id]
    @product = Product.new({photo: image, price: price, url: url, haul_id: haul_id})
    if @product.save
      render 'products/encode'
    end
  end


  private
  
  def product_parser_params
    params.require(:product_parser).permit(:url)
  end

end
