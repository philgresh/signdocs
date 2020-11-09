class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  include AuthConcern
  
  helper_method :current_user, :logged_in?
end
