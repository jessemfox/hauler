class Api::UsersController < ApplicationController
  before_filter :authenticate_user!

  def create
    #do this when you start using devise
    
  end
  
  def show
    @user = User.find(params[:id])
    @hauls = @user.hauls
    @followers = @user.followers
    @followed_users = @user.followed_users
    @saved_images = @user.saved_images
    @saved_products = @user.saved_products
  end
  
  def index
    #maybe don't do this?
    @users = User.all
    render :json => @users
  end
  


  private
  
  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :remember_me)
  end



end
