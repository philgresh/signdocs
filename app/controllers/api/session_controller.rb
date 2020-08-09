class Api::SessionController < ApplicationController
  before_action :require_logged_in, only: [:destroy]
  before_action :require_logged_out, only: [:create]

  def new
    render :new
  end
  
  def create
    @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    if @user
      login!(@user)
      redirect_to users_url
    else
      flash[:errors] = ['Invalid email or password']
      render :new
    end
  end

  def destroy
    logout!
    redirect_to new_session_url
  end 
end
