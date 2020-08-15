class Api::DocumentsController < ApplicationController
  def index
    # TODO: Filter based on authorization
    @documents = Document.all
    @editors = User.joins(:documents).where(documents: {id: @documents})
  end

  def show
    @document = Document.find(params[:id])
    @editors = User.where(id: @document.editor_ids)

    render :show
  end

  def create
    @post = Document.new(document_params)
    CreateDocument.call(@document) do |success, failure|
      success.call { render json: :show, notice: 'Successfully created document.' }
      failure.call { render :new }
    end
  end

  private
  def document_params
    params.require(:document).permit(:description,:title)
  end
end
