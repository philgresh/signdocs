require "hexapdf"
require "tempfile"

class Api::DocumentsController < ApplicationController
  TEXTBOX_FONT = "Times"
  TEXTBOX_VARIANT = :bold
  TEXTBOX_SIZE = 12

  rescue_from ActiveSupport::MessageVerifier::InvalidSignature, with: :invalid_params
  # before_action :require_owner_status, only: [:destroy, :update, :signedurl, :finalize]
  skip_before_action :verify_authenticity_token

  def index
    # TODO: Filter based on authorization
    @documents = Document.joins(:document_editors).where(:document_editors => { user_id: current_user.id })
    @editors = User.joins(:documents).where(documents: { id: @documents })
  end

  def show
    @document = @document || Document.find_by(id: params[:id])
    if @document
      @file = @document.final.attached? ? @document.final : @document.file
      @users = User.where(id: @document.editor_ids)
      @contentables = @document.content_fields
      render :show
    else
      render json: {
               document: [["That document does not exist or has been deleted."]],
             },
             status: :not_found
    end
  end

  def create
    signatory_ids = JSON.parse(params[:doc][:signatories])
    @document = Document.new(document_params)

    if @document.valid? && @document.save
      @document.editor_ids = signatory_ids << current_user.id
      @document.owner = current_user
      @preview_image = @document.file.preview(resize: "200x200>").processed.image
      show
    else
      @document.destroy
      render json: @document.errors.messages, status: :bad_request
    end
  end

  def update
    signatory_ids = []
    if params[:doc][:signatories].present?
      signatory_ids = JSON.parse(params[:doc][:signatories])
    end

    if @document.update(document_params)
      @document.editor_ids = signatory_ids << current_user.id
      @document.save
      show
    else
      render json: { document: @document.errors.messages }, status: 418
    end
  end

  def finalize
    @document = @document || Document.find_by(id: params[:id])
    if @document.nil?
      render json: {
               document: [["That document does not exist or has been deleted."]],
             },
             status: :not_found
    else
      @cfs = Hash.new { |h, k| h[k] = [] }
      @document.content_fields.each do |cf|
        @cfs[cf[:bbox]["page"].to_i] << cf
      end
      # Set up tempfiles
      # Iterate over source pages
      #   Write dest << source_contents
      #   Write dest << contentfields
      # Close dest
      # Upload dest in place of source
      # Delete both
      # Send back URL of dest

      source, dest, source_file = set_up_tempfiles(@document.file.blob)
      dest_path = dest.path
      source_path = source_file.path

      doc = HexaPDF::Document.new
      doc.fonts.add("Times")
      source.pages.each.with_index do |page, i|
        page_width = page.box.width
        page_height = page.box.height

        page_content = page.contents
        canvas = doc.pages.add([0, 0, page_width, page_height]).canvas

        # Duplicate source contents
        form = doc.import(page.to_form_xobject)
        canvas.xobject(form, at: [0, 0])

        # Add content_fields
        text_blocks = @cfs[i + 1].select { |cf| cf.contentable_type == "TextBlock" }
        sig_blocks = @cfs[i + 1].select { |cf| cf.contentable_type == "SignatureBlock" }

        write_text_blocks_to_canvas(
          canvas, text_blocks, page_width, page_height, doc.fonts
        )
        write_signature_blocks_to_canvas(
          canvas, sig_blocks, page_width, page_height
        )
      end
      doc.write(dest_path)

      new_filename = "#{@document.file.filename.base}-final.#{@document.file.filename.extension}"

      @document.final.attach(
        io: File.open(dest_path),
        filename: new_filename,
        content_type: @document.file.content_type,
      )

      @document.save!
      File.delete(dest_path) if File.exist?(dest_path)
      File.delete(source_path) if File.exist?(source_path)

      @users = @document.editors.where.not(email: "phil@gresham.dev")
      @users = @users.reject(&:example_email)

      FinalizeMailer.send_finalized_pdf(@users, @document).deliver if @users.size > 0

      show
    end
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

  def set_up_tempfiles(blob)
    source_file = Tempfile.new(blob.filename.to_s)
    dest = Tempfile.new("destinationPDF-#{Time.now.iso8601}.pdf")
    source_file.write(blob.download.force_encoding("UTF-8"))
    puts "processing file #{source_file.path}"
    source = HexaPDF::Document.open(source_file.path)
    return [source, dest, source_file]
  end

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

  def write_text_blocks_to_canvas(canvas, cfs, page_width, page_height, fonts)
    cfs.each do |cf|
      cf_width, cf_height, cf_top, cf_left = cf.bbox.values_at(
        "width", "height", "top", "left"
      ).map(&:to_f)
      cf_top = page_height - cf_top - cf_height / 2  # TODO: Fix positioning
      # HexaPDF sets up [0,0] at the bottom-left corner of a page
      cf_body = cf.contentable.body

      canvas.font(
        TEXTBOX_FONT,
        size: TEXTBOX_SIZE,
        variant: TEXTBOX_VARIANT,
      )
      canvas.text(cf_body, at: [cf_left, cf_top])
    end
  end

  def write_signature_blocks_to_canvas(canvas, cfs, width, height)
    cfs.each do |cf|
      cf_width, cf_height, cf_top, cf_left, cf_aspect_ratio = cf.bbox.values_at(
        "width", "height", "top", "left", "aspect_ratio"
      ).map(&:to_f)
      cf_top = height - cf_top - cf_height / 2  # TODO: Fix positioning
      # HexaPDF sets up [0,0] at the bottom-left corner of a page

      blob = cf.contentable.sig_image.blob
      filename = blob.filename.base

      svg_file = Tempfile.new [filename, ".svg"]
      svg_file.write(blob.download)
      png_file = Tempfile.new [filename, ".png"]

      sig = MiniMagick::Image.open(blob.service_url)
      sig.format "png"
      sig.combine_options do |cmd|
        cmd.background "none"
        cmd.transparent "white"
      end
      sig.write(png_file)

      canvas.xobject(
        png_file,
        at: [cf_left, cf_top],
        width: cf_width,
      )
    end
  end

  def translate_bbox_to_pxls(bbox, width, height)
    width_pxls = bbox["width"] * width
    height_pxls = bbox["height"] * height / bbox["aspect_ratio"]
  end
end
