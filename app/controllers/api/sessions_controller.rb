class Api::SessionsController < ApplicationController
  # before_action :require_logged_in, only: [:destroy]
  # before_action :require_logged_out, only: [:create]

  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )
    if @user
      cookies[:user_id] = { :value => @user.id, :expires => 2.weeks.from_now }
      login!(@user)
      render "api/users/show"
    else
      # flash[:errors] = ['Invalid email or password']
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
end
