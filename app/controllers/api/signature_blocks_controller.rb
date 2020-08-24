class Api::SignatureBlocksController < ApplicationController
  # before_action :require_owner, only: [:update]

  def show
    @signature = SignatureBlock.find(params[:id])
    @user = @signature.user
    render :show
  end

  def update
    @signature = SignatureBlock.find(params[:id])
    # TODO: Allow other changes
    if signature_params.permitted?
      font_family = params[:signature][:styling][:font_family]
      fill_color = params[:signature][:styling][:fill_color]
      @signature.gen_svg_from_name(
        font_family,
        fill_color
      )
      render :show
    else
      render json: { signature: ["You must be an owner to do that."] }, status: :unauthorized
    end
  end

  private

  def signature_params
    params.require(:signature).permit(styling: [:fill_color, :font_family])
  end

  def require_owner
    @signature = SignatureBlock.find(params[:id])
    @user = @signature.user
    if @user != current_user
      render json: { signature: ["You must be an owner to do that."] }, status: :unauthorized
    end
  end
end
