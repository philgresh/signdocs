class Api::DocumentsController < ApplicationController
  rescue_from ActiveSupport::MessageVerifier::InvalidSignature, with: :invalid_params

  def index
    # TODO: Filter based on authorization
    @documents = Document.all
    @editors = User.joins(:documents).where(documents: { id: @documents })
  end

  def show
    @document = @document || Document.find(params[:id])
    @editors = User.where(id: @document.editor_ids)
    # @owner = @document.owner
    render :show
  end

  def create
    @document = Document.new(document_params)

    if @document.valid? && @document.save
      @document.editors << current_user
      show
    else
      render json: @document.errors.messages, status: :bad_request
    end
    # CreateDocument.call(@document) do |success, failure|
    #   success.call { render json: :show, notice: "Successfully created document." }
    #   failure.call do
    #     render json: { document: "Cannot create document" }, status: 400
    #   end
    # end
  end

  private

  def document_params
    params.require(:doc).permit(:description, :title, :file)
  end

  def invalid_params
    errors = (@document && @document.errors.messages) || {}
    errors["document"] = ["Invalid parameters"]
    render json: errors, status: :bad_request
  end
end
