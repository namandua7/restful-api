Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check
  namespace :api do
    namespace :v1 do
      resources :boards
      resources :tasks
      resources :projects
      resources :users
      devise_for :users
    end
  end
end
