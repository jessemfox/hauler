class ChangePicturesController < ApplicationController


  def update
    @user = User.find(params[:id])
    
    if @user.update_attributes(:photo => params[:user][:photo])
      render "change_pictures/update"
    else
      render @user.errors
    end
  end

  private
  
  def chg_pic_params
    params.require(:user).permit(:photo)
  end

end
