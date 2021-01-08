require "hexapdf"
require "tempfile"
require "rmagick"

class Api::DocumentsController < ApplicationController
  TEXTBOX_FONT = "Times"
  TEXTBOX_VARIANT = :bold
  TEXTBOX_SIZE = 12
  TEXTBOX_PADDING_LEFT = 8

  rescue_from ActiveSupport::MessageVerifier::InvalidSignature, with: :invalid_params
  before_action :require_logged_in
  before_action :require_owner_status, only: [:destroy, :update, :signedurl, :finalize]
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

  def summary
    @user ||= current_user

    docs_to_sign = Document
      .select(:id)
      .group(:id)
      .joins(:content_fields)
      .where(content_fields: {
               signatory_id: @user.id,
               contentable_type: "SentinelBlock",
             })
      .pluck(:id)

    waiting_on_others = Document
      .select(:id)
      .group(:id)
      .joins(:document_editors, :content_fields)
      .where(document_editors: {
               user_id: @user.id,
               is_owner: true,
             })
      .where("content_fields.contentable_type = 'SentinelBlock' AND content_fields.signatory_id != ?", @user.id)
      .pluck(:id)

    render json: {
             summary: {
               docIdsToSign: docs_to_sign,
               docIdsWaitingOnOthers: waiting_on_others,
             },
           }
  end

  def finalize
    @document ||= Document.find_by(id: params[:id])

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
    SignatureBlock::SIGNATURE_STYLE_FONT_FAMILIES.each do |font|
      font_family, file = font.values_at(:font_family, :file)

      doc.fonts.add(file)
    end

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
    @current_user ||= current_user
    @document ||= Document.find(params[:id])

    if @document.nil?
      render json: {
               document: [["That document does not exist or has been deleted."]],
             },
             status: :not_found
    elsif @document.owner != @current_user
      render json: { document: ["You must be an owner to do that."] },
        status: :unauthorized
    end
  end

  def require_editor_status
    @current_user ||= current_user
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
      cf_top = page_height - cf_top - cf_height
      # HexaPDF sets up [0,0] at the bottom-left corner of a page
      cf_body = cf.contentable.body

      cf_top += TEXTBOX_PADDING_LEFT / 2
      cf_left += TEXTBOX_PADDING_LEFT

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
      cf_top = height - cf_top - cf_height
      # HexaPDF sets up [0,0] at the bottom-left corner of a page

      cf_left += TEXTBOX_PADDING_LEFT

      signature_block = cf.contentable
      blob = signature_block.sig_image.blob
      filename = blob.filename.base

      png_file = Tempfile.new [filename, ".png"]
      svg_file = Tempfile.new [filename, ".svg"]
      svg_file.write(blob.download)
      svg_file.close

      sig_font_family = signature_block.styling["font_family"]
      sig_font = SignatureBlock.get_font_file_from_family(sig_font_family)
      sig_font = "DejaVu-Sans" if sig_font.nil?

      svg = Magick::Image.read(svg_file.to_path) {
        # self.alpha(Magick::ActivateAlphaChannel)
        # self.alpha(Magick::BackgroundAlphaChannel)
        self.format = "SVG"
        self.fuzz = "20%"
        self.transparent_color = "white"
        self.background_color = "transparent"
        self.font = sig_font
      }.first
      # svg.alpha(Magick::ActivateAlphaChannel)
      # svg.alpha(Magick::BackgroundAlphaChannel)
      # svg.fuzz = "20%"
      # svg.background_color = "transparent"
      # svg.transparent("white")

      # svg.format = "SVG"
      svg.write png_file.to_path

      png = Magick::Image.read(png_file.to_path).first
      png.alpha(Magick::ActivateAlphaChannel)
      png.alpha(Magick::BackgroundAlphaChannel)
      png.fuzz = "20%"
      png.background_color = "transparent"
      png.transparent("white")
      png.write png_file.to_path

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
