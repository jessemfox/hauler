class TrendsController < ApplicationController


  def index
    @trending = Haul.trending
    render :json => @trending
  end


end
