# api_content_fields POST   /api/content_fields         api/content_fields#create {:format=>:json}
#  api_content_field PATCH  /api/content_fields/:id     api/content_fields#update {:format=>:json}
#                    PUT    /api/content_fields/:id     api/content_fields#update {:format=>:json}
#                    DELETE /api/content_fields/:id     api/content_fields#destroy {:format=>:json}

class Api::ContentFieldsController < ApplicationController
  def create
    filled, block_type = parse_type_params
    if filled === "UNFILLED"
      sentinel = SentinelBlock.new(block_type: block_type)
      @cf = ContentField.new(
        bbox: params[:content_field][:bbox],
        assignee_id: params[:content_field][:assignee_id],
        document_id: params[:content_field][:document_id],
        :contentable => sentinel,
      )
    else
      # Attach existing signature/text block to this content field
    end

    if @cf.save
      render :show
    else
      render json: @cf.errors.messages, status: :bad_request
    end
  end

  def update
    filled, block_type = parse_type_params
    if filled === "UNFILLED"
      @cf = ContentField.find(params[:id])
      @cf.update_attributes(:bbox => params[:content_field][:bbox])
    else
      # Attach existing signature/text block to this content field
    end

    if @cf.save
      render :show
    else
      render json: @cf.errors.messages, status: :bad_request
    end
  end

  def destroy
    @cf = ContentField.find(params[:id])
    if @cf.contentable.destroy && @cf.destroy
      render json: { id: @cf.id }
    else
      render json: @cf.errors.messages, status: :bad_request
    end
  end

  private

  def content_field_params
    params.require(:content_field).permit(
      :assignee_id,
      :type,
      :document_id,
      bbox: [
        :x, :y, :width, :height, :page,
      ],
    )
  end

  def parse_type_params
    params[:content_field][:type].split("_")
  end
end
