class Api::UserHaulsController < ApplicationController

  def index
    @user = User.find(params[:user_id])
    @hauls = @user.hauls
    render :json => @hauls
  end
  

  private
  def haul_params
    params.require(:haul).permit(:owner_id, :title, :description)
  end

end
