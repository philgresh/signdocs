require "digest"
require "securerandom"

class Api::SessionsController < ApplicationController
  # include ForgottenPasswordMailer
  # before_action :require_logged_in, only: [:destroy]
  # before_action :require_logged_out, only: [:create]
  # skip_before_action :verify_authenticity_token, only: [:reset]
  protect_from_forgery with: :null_session, only: [:reset]

  def create
    @user = User.find_by_credentials(
      session_params[:email],
      session_params[:password]
    )
    if @user
      cookies[:user_id] = { :value => @user.id, :expires => 2.weeks.from_now }
      login!(@user)
      @documents = @user.documents
      @editors = User.joins(:documents).where(documents: { id: @documents })
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

    if @user && !@user.example_email
      reset_string = @user.create_password_reset_token
      url_base = Rails.env.production? ? "https://signdocs.herokuapp.com" : "http://localhost:3000"

      url = "#{url_base}/#/reset/#{reset_string}"

      if @user.save
        ForgottenPasswordMailer.send_password_reset_token(@user, url).deliver
      else
        puts "Some kind of error: #{@user.errors.full_messages}"
      end
    end
  end

  def reset
    if reset_params[:password] != reset_params[:password_confirmation]
      render json: { reset: "Passwords must match!" }
    else
      reset_string_bytes = Base64.urlsafe_decode64 reset_params[:reset_token]
      reset_token_bytes = reset_string_bytes.byteslice(0...20)
      reset_token_verifier = reset_string_bytes.slice(20..-1)

      reset_token = Base64.urlsafe_encode64(reset_token_bytes, padding: false)

      @user = User.find_by(reset_token: reset_token)
      if @user && @user.reset_token_exp >= Time.now.to_i && reset_token_verified(reset_token_verifier)
        @user.password = reset_params[:password]
        if (@user.save)
          render json: { reset: "Password successfully reset!" }
          @user.clear_password_reset_token
        else
          render @user.errors.full_messages, status: 400
        end
      else
        render json: { reset: ["That link is invalid or has expired. Please try to reset again."] }, status: 400
        @user.clear_password_reset_token if @user
      end
    end
  end

  private

  def session_params
    params.require(:user).permit(:email, :password)
  end

  def reset_token_verified(reset_token_verifier)
    Digest::SHA256.hexdigest(reset_token_verifier) == @user.reset_token_verifier
  end

  def email_param
    params.permit(:email)
  end

  def reset_params
    params.require(:reset).permit(:reset_token, :password_confirmation, :password)
  end
end
