# https://www.toptal.com/ruby-on-rails/rails-service-objects-tutorial

class DocumentCreator < ApplicationService
  def initialize(document_params, signatory_ids, current_user)
    @signatory_ids = signatory_ids
    @document = Document.new(document_params)
    @current_user ||= current_user
  end

  def call
    errors = nil
    if @document.save
      @document.editor_ids = @signatory_ids << @current_user.id
      @document.owner = @current_user
      @preview_image = @document.file.preview(resize: "200x200>").processed.image
    else
      errors = @document.errors.messages
      @document.destroy
    end
    return [@document, errors]
  end
end
