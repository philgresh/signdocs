class Api::DocumentsController < ApplicationController
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
    @document.editors << current_user

    if @document && @document.save
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
end
