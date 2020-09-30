# api_content_fields POST   /api/content_fields         api/content_fields#create {:format=>:json}
#  api_content_field PATCH  /api/content_fields/:id     api/content_fields#update {:format=>:json}
#                    PUT    /api/content_fields/:id     api/content_fields#update {:format=>:json}
#                    DELETE /api/content_fields/:id     api/content_fields#destroy {:format=>:json}

class Api::ContentFieldsController < ApplicationController
  SIGNEE_NAME = "SIGNEE_NAME"
  UNFILLED = "UNFILLED"
  SIGNATURE = "SIGNATURE"
  TEXT = "TEXT"
  CURRENT_DATE = "CURRENT_DATE"

  def create
    filled, block_type = parse_type_params
    if filled === "UNFILLED"
      placeholder = block_type == "TEXT" ? params[:content_field][:placeholder] : nil
      sentinel = SentinelBlock.new(block_type: block_type, placeholder: placeholder)

      @cf = ContentField.new(
        bbox: params[:content_field][:bbox],
        signatory_id: params[:content_field][:signatory_id],
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
    @cf = ContentField.find(params[:id])
    filled, block_type = parse_type_params
    if filled == UNFILLED
      @cf.update_attributes(:bbox => params[:content_field][:bbox])
    else
      # User is "undoing" an action (e.g. removing a signature)
    end

    if @cf.save
      render :show
    else
      render json: @cf.errors.messages, status: :bad_request
    end
  end

  def sign
    @cf = ContentField.find(params[:id])

    block_type = @cf.contentable.block_type

    case block_type
    when SIGNATURE
      handle_signature_sign
    when TEXT
      handle_textbox_sign
    else
      render json: { contentFields: ["You've somehow broken this thing..."] }, status: :bad_request
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
      :signatory_id,
      :type,
      :document_id,
      bbox: [
        :x, :y, :width_pct, :aspect_ratio, :page,
      ],
    )
  end

  def parse_type_params
    params[:content_field][:type].split("_")
  end

  def handle_signature_sign
    sig = User.find(@cf.signatory_id).signature
    if sig
      @cf.contentable.destroy
      @cf.contentable = sig
      @cf.save
      render :show
    else
      render json: { contentFields: ["Signatory is not valid or does not have a valid signature"] }, status: :bad_request
    end
  end

  def handle_textbox_sign
    contentable = @cf.contentable
    curr_user = current_user
    if contentable.placeholder == CURRENT_DATE
      body = Time.now.iso8601
      type = CURRENT_DATE
    elsif contentable.placeholder == SIGNEE_NAME
      body = curr_user.full_name
      type = SIGNEE_NAME
    end

    new_textblock = TextBlock.new(
      body: body,
      text_type: type,
      user_id: curr_user.id,
    )

    if new_textblock.save
      @cf.contentable.destroy
      @cf.contentable = new_textblock
      @cf.save
      new_textblock
      render :show
    else
      render json: { contentFields: ["Signatory is not valid or does not have a valid signature"] }, status: :bad_request
    end
  end
end
