class Api::FeedsController < ApplicationController
  
  def index
    @user = User.find(params[:user_id])
    @hauls = @user.feed
    render 'feeds/index'
  end
  
  
  
end