class Api::UsersController < ApplicationController
  
  # before_action :require_logged_in, only: [:show, :index]
  # before_action :require_logged_out, only: [:create]
  before_save :downcase_fields

  
  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render :show
    else
      # flash[:errors] = @user.errors.full_messages
      errors = @user.errors.full_messages
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

  def downcase_fields
    self.email.downcase!
 end
end
