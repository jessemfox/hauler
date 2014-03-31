class ProductSavesController < ApplicationController

  def create
    @product_save = ProductSave.new(product_saves_params)
    if @product_save.save
      render :json => @product_save
    else
      render @product_save.errors
    end
  end
  
  def destroy
    @ps = ProductSave.find(params[:id])
    @ps.destroy
    render :json => @ps
  end

  private
  
  def product_saves_params
    params.require(:product_save).permit(:user_id, :product_id)
  end

end
