Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :show, :create, :update]
    resources :documents, only: [:index, :show, :create, :update, :destroy] do
      member do
        get 'signedurl'
        get "final"
        post "final"
      end
    end
    resources :content_fields, only: [:create, :update, :destroy]
    resources :sentinel_blocks, only: [:show, :update]
    resources :signature_blocks, only: [:show, :update]
    resources :text_blocks, only: [:show, :update]
    resource :session, only: [:create, :destroy]
  end
  root "static_pages#root"
end
