Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check
  namespace :api do
    namespace :v1 do
      resources :boards
      resources :users do
        resources :projects do
          resources :tasks
        end
      end
      devise_for :users
    end
  end
end
