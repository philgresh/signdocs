# == Route Map
#
#                    Prefix Verb   URI Pattern                                                                              Controller#Action
#                 api_users GET    /api/users(.:format)                                                                     api/users#index {:format=>:json}
#                           POST   /api/users(.:format)                                                                     api/users#create {:format=>:json}
#                  api_user GET    /api/users/:id(.:format)                                                                 api/users#show {:format=>:json}
#                           PATCH  /api/users/:id(.:format)                                                                 api/users#update {:format=>:json}
#                           PUT    /api/users/:id(.:format)                                                                 api/users#update {:format=>:json}
#    signedurl_api_document GET    /api/documents/:id/signedurl(.:format)                                                   api/documents#signedurl {:format=>:json}
#        final_api_document GET    /api/documents/:id/final(.:format)                                                       api/documents#final {:format=>:json}
#                           POST   /api/documents/:id/final(.:format)                                                       api/documents#finalize {:format=>:json}
#             api_documents GET    /api/documents(.:format)                                                                 api/documents#index {:format=>:json}
#                           POST   /api/documents(.:format)                                                                 api/documents#create {:format=>:json}
#              api_document GET    /api/documents/:id(.:format)                                                             api/documents#show {:format=>:json}
#                           PATCH  /api/documents/:id(.:format)                                                             api/documents#update {:format=>:json}
#                           PUT    /api/documents/:id(.:format)                                                             api/documents#update {:format=>:json}
#                           DELETE /api/documents/:id(.:format)                                                             api/documents#destroy {:format=>:json}
#    sign_api_content_field POST   /api/content_fields/:id/sign(.:format)                                                   api/content_fields#sign {:format=>:json}
#        api_content_fields POST   /api/content_fields(.:format)                                                            api/content_fields#create {:format=>:json}
#         api_content_field PATCH  /api/content_fields/:id(.:format)                                                        api/content_fields#update {:format=>:json}
#                           PUT    /api/content_fields/:id(.:format)                                                        api/content_fields#update {:format=>:json}
#                           DELETE /api/content_fields/:id(.:format)                                                        api/content_fields#destroy {:format=>:json}
#        api_sentinel_block GET    /api/sentinel_blocks/:id(.:format)                                                       api/sentinel_blocks#show {:format=>:json}
#                           PATCH  /api/sentinel_blocks/:id(.:format)                                                       api/sentinel_blocks#update {:format=>:json}
#                           PUT    /api/sentinel_blocks/:id(.:format)                                                       api/sentinel_blocks#update {:format=>:json}
#       api_signature_block GET    /api/signature_blocks/:id(.:format)                                                      api/signature_blocks#show {:format=>:json}
#                           PATCH  /api/signature_blocks/:id(.:format)                                                      api/signature_blocks#update {:format=>:json}
#                           PUT    /api/signature_blocks/:id(.:format)                                                      api/signature_blocks#update {:format=>:json}
#            api_text_block GET    /api/text_blocks/:id(.:format)                                                           api/text_blocks#show {:format=>:json}
#                           PATCH  /api/text_blocks/:id(.:format)                                                           api/text_blocks#update {:format=>:json}
#                           PUT    /api/text_blocks/:id(.:format)                                                           api/text_blocks#update {:format=>:json}
#         reset_api_session POST   /api/session/reset(.:format)                                                             api/sessions#reset {:format=>:json}
#     forgotten_api_session POST   /api/session/forgotten(.:format)                                                         api/sessions#forgotten {:format=>:json}
#               api_session DELETE /api/session(.:format)                                                                   api/sessions#destroy {:format=>:json}
#                           POST   /api/session(.:format)                                                                   api/sessions#create {:format=>:json}
#                      root GET    /                                                                                        static_pages#root
#        rails_service_blob GET    /rails/active_storage/blobs/:signed_id/*filename(.:format)                               active_storage/blobs#show
# rails_blob_representation GET    /rails/active_storage/representations/:signed_blob_id/:variation_key/*filename(.:format) active_storage/representations#show
#        rails_disk_service GET    /rails/active_storage/disk/:encoded_key/*filename(.:format)                              active_storage/disk#show
# update_rails_disk_service PUT    /rails/active_storage/disk/:encoded_token(.:format)                                      active_storage/disk#update
#      rails_direct_uploads POST   /rails/active_storage/direct_uploads(.:format)                                           active_storage/direct_uploads#create

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :show, :create, :update]
    resources :documents, only: [:index, :show, :create, :update, :destroy] do
      member do
        get "signedurl"
        get "final"
        post "finalize"
      end
    end
    get "summary", to: "documents#summary", as: :summary
    resources :content_fields, only: [:create, :update, :destroy] do
      member do
        post "sign"
      end
    end
    resources :sentinel_blocks, only: [:show, :update]
    resources :signature_blocks, only: [:show, :update]
    resources :text_blocks, only: [:show, :update]
    resource :session, only: [:create, :destroy] do
      member do
        post "reset"
        post "forgotten"
      end
    end
  end
  root "static_pages#root"
end
