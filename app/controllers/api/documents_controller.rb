class Api::DocumentsController < ApplicationController
  rescue_from ActiveSupport::MessageVerifier::InvalidSignature, with: :invalid_params
  before_action :require_logged_in
  before_action :require_owner_status, only: [:destroy, :signedurl]
  before_action :require_editor_status, only: [:edit, :update]

  def index
    # TODO: Filter based on authorization
    @documents = Document.all
    @editors = User.joins(:documents).where(documents: { id: @documents })
  end

  def show
    @document = @document || Document.find_by(id: params[:id])
    if @document
      @users = User.where(id: @document.editor_ids)
      render :show
    else
      render json: {
               document: [["That document does not exist or has been deleted."]],
             },
             status: :not_found
    end
  end

  def create
    @document = Document.new(document_params)

    if @document.valid? && @document.save
      @document.editors << current_user
      @document.owner = current_user
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

  def destroy
    @document = Document.find(params[:id])
    @document.file.purge_later
    if @document.destroy
      render json: { document: { id: @document.id } }, status: :ok
    else
      render json: { document: ["An error occured."] }, status: 418
    end
  end

  def signedurl
    url = @document.gen_presigned_url
    render json: { document: {
             id: @document.id,
             signedUrl: url,
           } }
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

  def require_owner_status
    @document ||= Document.find(params[:id])
    if @document.owner != current_user
      render json: { document: ["You must be an owner to do that."] }, status: :unauthorized
    end
  end

  def require_editor_status
    @document ||= Document.find(params[:id])
    if !@document.editors.include?(current_user)
      render json: { document: ["You must be an editor to do that."] }, status: :unauthorized
    end
  end
end
