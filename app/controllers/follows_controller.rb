class FollowsController < ApplicationController

  def create
    @follow = Relationship.new(follow_params)
    if @follow.save
      render :json => @follow
    else
      render :json => @follow.errors, :status => :unprocessable_entity
    end
    
  end
  
  def destroy
    follow = Relationship.find_by_follower_id_and_followed_id(
    params[:relationship][:follower_id],
    params[:relationship][:followed_id]
    )
    
    if follow
      follow.destroy
    end
    
  end


  private
  
  def follow_params
    params.require(:relationship).permit(:follower_id, :followed_id)
  end

end
