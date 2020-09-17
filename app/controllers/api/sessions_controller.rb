class Api::SessionsController < ApplicationController
  # include ForgottenPasswordMailer
  # before_action :require_logged_in, only: [:destroy]
  # before_action :require_logged_out, only: [:create]
  skip_before_action :verify_authenticity_token, only: [:reset]

  def create
    @user = User.find_by_credentials(
      session_params.email,
      session_params.password
    )
    if @user
      cookies[:user_id] = { :value => @user.id, :expires => 2.weeks.from_now }
      login!(@user)
      render "api/users/show"
    else
      render json: { password: [["Invalid email or password"]] }, status: 403
    end
  end

  def destroy
    @user = current_user
    if @user
      logout!
      redirect_to root_url, status: 204
    else
      render json: {}, status: 404
    end
  end

  def forgotten
    render :json, { forgotten: "If that email address is in our database, we will send you an email to reset your password." }

    @email = email_param[:email].downcase
    @user = User.find_by(email: @email)

    if @user && !example_email
      reset_token = SecureRandom.urlsafe_base64(24)
      url = "https://signdocs.herokuapp.com/#/reset/#{}"

      ForgottenPasswordMailer.with(user: @user, url: url).forgotten_password.deliver_later

      @user.session_token = reset_token
      @user.save
    end
  end

  def reset
    if reset_param
      @token = reset_param[:reset_token]
      @user = User.find_by(session_token: @token)
      debugger
    end
  end

  private

  def example_email
    /example\.org$/ =~ @user.email ||
    /example\.com$/ =~ @user.email
  end

  def session_params
    params.require(:user).permit(:email, :password)
  end

  def email_param
    params.permit(:email)
  end

  def reset_param
    params.permit(:reset_token)
  end
end
