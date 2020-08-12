class Api::DocumentsController < ApplicationController
  def show
    @document = Document.find(params[:id])
    render :show
  end
end
