class ApplicationMailer < ActionMailer::Base
  include SendGrid

  def attach_resume
    
    resume_link = Rails.env.production? ? ENV["RESUME_DOWNLOAD_LINK"] : Rails.application.credentials.dig(:resume_download_link)
    resume_content = open(resume_link) { |io| io.read }

    attachment = Attachment.new
    attachment.content = Base64.strict_encode64(resume_content)
    attachment.type = "application/pdf"
    attachment.filename = "Gresham-Phil_Resume"
    attachment.disposition = "attachment"
    return attachment
  end

  def attach_final(final)
    
    file_link = final.service_url
    content = open(file_link) { |io| io.read }

    attachment = Attachment.new
    attachment.content = Base64.strict_encode64(content)
    attachment.type = final.content_type
    attachment.filename = final.filename.to_s
    attachment.disposition = "attachment"
    return attachment
  end
end
