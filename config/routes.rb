Rails.application.routes.draw do
  root to: 'static_pages#root'
  namespace :api, defaults: { format: :json } do
    resources :trips, only: [:index]
    resources :planets, only: [:index]
  end
end
