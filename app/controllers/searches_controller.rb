class SearchesController < ApplicationController


  def index
    
    arr = Search.run(params[:search][:string])
    render :json => arr
  end

end
