class Api::SessionsController < ApplicationController
  # before_action :require_logged_in, only: [:destroy]
  # before_action :require_logged_out, only: [:create]

  def create
    @user = User.find_by_credentials(
      params[:user][:email].downcase!,
      params[:user][:password]
    )
    if @user
      login!(@user)
      render "api/users/show"
    else
      # flash[:errors] = ['Invalid email or password']
      render json: ["Invalid email or password"], status: 401
    end
  end

  def destroy
    @user = current_user
    if @user
      logout!
      redirect_to root_url, status: 204
    else
      render json: ["Nobody signed in"], status: 404
    end
  end
end
