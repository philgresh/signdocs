require "sendgrid-ruby"
require "open-uri"

class FinalizeMailer < ApplicationMailer
  include SendGrid

  def send_finalized_pdf(users, doc)
    @users = users.map do |user|
      {
        first_name: user.first_name,
        full_name: user.full_name,
        email: user.email,
      }
    end

    sendgrid_template_id = Rails.application.credentials.sendgrid[:template_finalized_document]
    sendgrid_asm_id = Rails.application.credentials.sendgrid[:asm_id]
    sendgrid_api_password = Rails.env.production? ? ENV["SENDGRID_API_KEY"] : Rails.application.credentials.sendgrid[:api_password]

    mail = SendGrid::Mail.new
    mail.from = Email.new(email: "phil@gresham.dev", name: "Phil Gresham")
    mail.asm = ASM.new(group_id: sendgrid_asm_id)

    mail.add_attachment(attach_final(doc.final))
    mail.template_id = sendgrid_template_id

    @users.each.with_index do |user, i|
      personalization = Personalization.new
      personalization.add_to(Email.new(email: user[:email], name: user[:full_name]))
      personalization.subject = "Your finalized document from SignDocs"
      personalization.add_dynamic_template_data({
        :user => user,
      })
      mail.add_personalization(personalization)
    end

    mail_settings = MailSettings.new
    mail.mail_settings = mail_settings

    puts mail.to_json

    sg = SendGrid::API.new(api_key: sendgrid_api_password)
    begin
      response = sg.client.mail._("send").post(request_body: mail.to_json)
    rescue Exception => e
      puts "************ ERROR ************"
      puts e.message
      puts "************ END ERROR ************"
    end
    puts "************ SUCCESS ************"
    puts response.status_code
    puts response.body
    puts response.headers
    puts "************ END SUCCESS ************"
  end
end
