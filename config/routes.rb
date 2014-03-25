Hauler::Application.routes.draw do
  root :to => 'static_pages#root'
  devise_for :users
  
  resources :apps, only: [:index]
  
  namespace :api do
    resources :users, only: [:show, :index] do
      resources :feeds, only: [:index]
      resources :user_hauls, only: [:index]
    end
  end
  
  resources :hauls, only: [:create, :show, :index]
  
  resources :products, only: [:create]
  
  resources :post_images, only: [:create]
  
  resources :trends, only: [:index]
  
  resources :product_parsers, only: [:create]
  
  resources :image_saves, only: [:create]
  
  resources :product_saves, only: [:create]

  
  resources :follows, only: [:create, :destroy]
  
  post 'product_parsers/encode', to: 'product_parsers#encode'
end
