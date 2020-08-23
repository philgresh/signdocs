class Api::SignatureBlocksController < ApplicationController
  # before_action :require_owner, only: [:update]

  def show
    @signature = SignatureBlock.find(params[:id])
    @user = @signature.user
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
    params.require(:signature).permit(:styling)
  end

  def require_owner
    @signature = SignatureBlock.find(params[:id])
    @user = @signature.user
    if @user != current_user
      render json: { signature: ["You must be an owner to do that."] }, status: :unauthorized
    end
  end
end
