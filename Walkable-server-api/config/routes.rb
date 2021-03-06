Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resource :users, only: [:show, :update, :create]
  resource :favorites, only: [:create]
  resource :pins, only: [:create, :update]

  post '/users/login', to: 'users#authenticate', as: 'user_authenticate'
  get '/users/:id/favorites', to: 'users#get_favorites', as: 'user_get_favorites'
  get '/users/:id/pins', to: 'users#get_pins', as: 'user_get_pins'
  get '/users/:user_id/:foursquare_id', to: 'users#add_favorites', as: 'user_add_favorites'
  get '/users/:user_id/:foursquare_id/delete', to: 'users#delete_favorites', as: 'user_delete_favorites'
  get '/pins/:id/delete', to: 'pins#delete', as: 'delete_pin'

end
