class StaticPagesController < ApplicationController

  def root
    redirect_to apps_url 
    
  end

end
