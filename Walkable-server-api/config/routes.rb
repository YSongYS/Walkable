Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resource :users, only: [:show, :update, :create]
  resource :favorites, only: [:create, :delete]

  post '/users/login', to: 'users#authenticate', as: 'user_authenticate'
  get '/users/:id/favorites', to: 'users#get_favorites', as: 'user_get_favorites'

end
