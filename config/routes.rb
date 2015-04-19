Rails.application.routes.draw do
  namespace :api do
  get 'intineraries/create'
  end

  namespace :api do
  get 'intineraries/show'
  end

  namespace :api do
  get 'intineraries/destroy'
  end

  get 'intineraries/create'

  get 'intineraries/show'

  get 'intineraries/destroy'

  root to: 'static_pages#root'
  namespace :api, defaults: { format: :json } do
    resources :travelers, only: [:index, :show]
    resources :planets, only: [:index]
    resources :trips, only: [:index, :show, :update]
    resources :itineraries, only: [:create, :show, :destroy]
  end
end
