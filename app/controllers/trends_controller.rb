class TrendsController < ApplicationController


  def index
    #eventually user these two lines bellow
    # @trending = Haul.trending
#     render :json => @trending
  
    @hauls = Haul.all
    render 'trends/trends'
  end


end
