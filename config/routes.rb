Hauler::Application.routes.draw do
  root :to => 'static_pages#root'
  devise_for :users
  
  resources :apps, only: [:index]
  
  namespace :api do
    resources :users, only: [:show, :index] do
      resources :user_hauls, only: [:index]
    end
  end
  
  resources :hauls, only: [:create, :show, :index]
  
  resources :post_images, only: [:create]
  
  resources :trends, only: [:index]
  
  
end
