Rails.application.routes.draw do
  root to: 'application#tmp_root'
  resource :travel, only: [:new, :index]
end
