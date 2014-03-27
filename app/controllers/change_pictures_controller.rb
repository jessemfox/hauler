class ChangePicturesController < ApplicationController


  def update
    @user = User.find(params[:id])
    puts params[:user][:photo]
    if @user.update_attributes(:photo => params[:user][:photo])
      render :json => @user.photo.url(:browser)
    else
      render @user.errors
    end
  end

  private
  
  def chg_pic_params
    params.require(:user).permit(:photo)
  end

end