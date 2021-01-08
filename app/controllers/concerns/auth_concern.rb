module AuthConcern
  extend ActiveSupport::Concern

  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def login!(user)
    session[:session_token] = user.reset_session_token!
    @current_user = user
  end

  def logout!
    @current_user.reset_session_token!
    @current_user = nil
    session[:session_token] = nil
  end

  def logged_in?
    !!current_user
  end

  def require_logged_in
    @current_user ||= current_user
    unless @current_user
      render json: { base: ["invalid credentials"] }, status: 401
    end
  end

  def require_logged_out
    # redirect_to users_url if logged_in?
  end

  # rescue_from User::NotAuthorized, with: :user_not_authorized
  # def user_not_authorized
  # flash[:error] = "You don't have access to this section."
  # redirect_back(fallback_location: root_path)
  # render json: { user: ["You are not authorized to do that."] }
  # https://edgeguides.rubyonrails.org/action_controller_overview.html#the-default-500-and-404-templates
  # end
  

end