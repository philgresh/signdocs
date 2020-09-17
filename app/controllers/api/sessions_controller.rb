require "sendgrid-ruby"

class Api::SessionsController < ApplicationController
  include SendGrid
  # before_action :require_logged_in, only: [:destroy]
  # before_action :require_logged_out, only: [:create]
  # skip_before_action :verify_authenticity_token, only: [:reset]
  protect_from_forgery with: :null_session, only: [:reset]

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
    render json: { forgotten: "If that email address is in our database, we will send you an email to reset your password. The link will expire in 36 hours." }, status: 200

    @email = email_param[:email].downcase
    @user = User.find_by(email: @email)

    if @user && !example_email
      reset_token = SecureRandom.urlsafe_base64(24)
      url = "https://signdocs.herokuapp.com/#/reset/#{reset_token}"

      
      @user.reset_token = reset_token
      @user.reset_token_exp = 36.hours.from_now.to_i
      send_password_reset_token(@user, url) if @user.save
    end
  end

  def reset
    @token = reset_params[:reset_token]
    @user = User.find_by(reset_token: @token)
    if @user && @user.reset_token_exp >= Time.now.to_i
      @user.password = reset_params[:password]
      @user.reset_token = nil
      @user.reset_token_exp = nil
      if (@user.save)
        render json: { reset: "Password successfully reset!" }
      else
        render @user.errors.full_messages, status: 400
      end
    else
      render json: { reset: "That link has expired. Please try to reset again." }, status: 400
    end
  end

  

  def send_password_reset_token(user, url)
    from = Email.new(email: "phil@gresham.dev")
    to = Email.new(email: user.email)
    subject = "Your password reset token for SignDocs"
    content = Content.new(type: "text/plain", value: "and easy to do anywhere, even with Ruby")
    mail = Mail.new(from, subject, to, content)

    sg = SendGrid::API.new(api_key: ENV["SENDGRID_API_KEY"])
    response = sg.client.mail._("send").post(request_body: mail.to_json)
    puts response.status_code
    puts response.body
    puts response.headers
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

  def reset_params
    params.permit(:reset_token, :password)
  end
end
