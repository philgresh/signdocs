class Api::UsersController < ApplicationController

  before_action :require_logged_in, only: [:show, :index, :summary]
  # before_action :require_logged_out, only: [:create]
  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render :show
    else
      errors = @user.errors.messages
      render json: errors, status: 403
    end
  end

  def index
    @users = User.all
    render :index
  end

  def show
    @user = User.find(params[:id])

    render :show
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :first_name, :last_name)
  end
end
