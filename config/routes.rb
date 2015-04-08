Rails.application.routes.draw do
  root to: 'application#tmp_root'
  resources :gate_trips, only: [:index]
  
end
