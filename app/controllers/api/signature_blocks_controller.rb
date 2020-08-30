require 'base64'
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
      svg_data = params[:signature][:svg_data]
      if svg_data.nil?
        handle_style_changes
      else
        handle_sig_data_changes
      end
      render :show
    else
      render json: { signature: ["You must be an owner to do that."] }, status: :unauthorized
    end
  end

  private

  def signature_params
    params.require(:signature).permit(:svg_data, styling: [:fill_color, :font_family])
  end

  def require_owner
    @signature = SignatureBlock.find(params[:id])
    @user = @signature.user
    if @user != current_user
      render json: { signature: ["You must be an owner to do that."] }, status: :unauthorized
    end
  end

  def handle_style_changes
    font_family = params[:signature][:styling][:font_family]
    fill_color = params[:signature][:styling][:fill_color]
    @signature.gen_svg_from_name(
      font_family,
      fill_color
    )
  end

  def handle_sig_data_changes
    svg_data = params[:signature][:svg_data]
    start_index = svg_data.index(/base64\,/) + 7
    svg_data = svg_data[start_index..-1]
    decoded = Base64.decode64(svg_data)
    decoded = decoded.gsub("width=\"600\"", "width=\"180\" x=\"20\" y=\"20\"")
    decoded = decoded.gsub("width=\"300\"", "width=\"180\" x=\"20\" y=\"20\"")
    decoded = decoded.gsub("height=\"200\"", "height=\"60\"")
    decoded = decoded.gsub("height=\"100\"", "height=\"60\"")
    decoded = decoded.gsub("viewBox=\"0 0 300 100\"", "viewBox=\"0 0 600 200\"")

    @signature[:styling]["font_family"] = ''

    @signature.gen_svg_wrapper(decoded)
  end
end
