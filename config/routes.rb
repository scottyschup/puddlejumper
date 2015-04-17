Rails.application.routes.draw do
  root to: 'static_pages#root'
  namespace :api, defaults: { format: :json } do
    resources :travelers, only: [:index, :show]
    resources :planets, only: [:index]
    resources :trips, only: [:index, :show, :update]
    resources :itineraries, only: [:create, :show, :destroy]
  end
end
