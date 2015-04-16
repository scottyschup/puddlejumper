Rails.application.routes.draw do
  get 'sessions/new'

  get 'sessions/create'

  get 'sessions/destroy'

  get 'users/new'

  get 'users/create'

  get 'users/user_params'

  root to: 'static_pages#root'
  namespace :api, defaults: { format: :json } do
    resources :planets, only: [:index]
    resources :trips, only: [:index]
    resource :trip, only: [:show, :update]
  end
end
