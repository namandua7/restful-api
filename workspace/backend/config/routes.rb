Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check
  namespace :api do
    namespace :v1 do
      devise_for :users, controllers: {
        sessions: 'api/v1/sessions',
        registrations: 'devise/registrations',
        passwords: 'devise/passwords',
        confirmations: 'devise/confirmations',
        unlocks: 'devise/unlocks',
        invitations: 'devise/invitations'
      }
    end
  end
end
