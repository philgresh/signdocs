# api_content_fields POST   /api/content_fields         api/content_fields#create {:format=>:json}
#  api_content_field PATCH  /api/content_fields/:id     api/content_fields#update {:format=>:json}
#                    PUT    /api/content_fields/:id     api/content_fields#update {:format=>:json}
#                    DELETE /api/content_fields/:id     api/content_fields#destroy {:format=>:json}

class Api::ContentFieldsController < ApplicationController
  def create

  end

  def update

  end

  def destroy

  end

  private
  def content_field_params
    params.require(:content_field).permit(:assignee_id, :document_id, :type)
  end
end
