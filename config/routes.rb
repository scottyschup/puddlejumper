Rails.application.routes.draw do
  root to: 'static_pages#root'
  resources :gate_trips, only: [:index]

end
