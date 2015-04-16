Rails.application.routes.draw do
  root to: 'static_pages#root'
  namespace :api, defaults: { format: :json } do
    resources :travelers, only: [:index, :show]
    resources :planets, only: [:index]
    resources :trips, only: [:index]
    resource :trip, only: [:show, :update]
  end
end
