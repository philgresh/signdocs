class Api::SignatureBlocksController < ApplicationController
  before_action :require_owner, only: [:update]

  def show
    @user = User.find(params[:id])
    @signature ||= @user.signature
    render :show
  end

  def update
    if @signature.update_attributes(signature_params)
      render :show
    else
      render json: { signature: ["You must be an owner to do that."] }, status: :unauthorized
    end
  end

  private

  def signature_params
    params.require(:signature).permit(:body, :styling)
  end

  def require_owner
    @user = User.find(params[:id])
    @signature ||= @user.signature
    if @user != current_user
      # render json: { signature: ["You must be an owner to do that."] }, status: :unauthorized
    end
  end
end
