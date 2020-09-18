require "sendgrid-ruby"

class ForgottenPasswordMailer < ApplicationMailer
  include SendGrid

  def send_password_reset_token(user, url)
    @user = {
      first_name: user.first_name,
      full_name: user.full_name,
      email: user.email,
    }

    mail = SendGrid::Mail.new
    mail.from = Email.new(email: "phil@gresham.dev", name: "Phil Gresham")
    mail.asm = ASM.new(group_id: 14296)

    personalization = Personalization.new
    personalization.add_to(Email.new(email: @user[:email], name: @user[:full_name]))
    personalization.subject = "Your password reset token for SignDocs"
    personalization.add_dynamic_template_data({
      :url => url,
      :user => @user,
    })

    mail.add_personalization(personalization)
    mail.template_id = Rails.application.credentials.dig(:sendgrid_template_forgotten_password)

    key = Rails.env.production? ? ENV["SENDGRID_API_KEY"] : Rails.application.credentials.dig(:sendgrid_api_password)
    puts mail.to_json

    sg = SendGrid::API.new(api_key: key)
    begin
      response = sg.client.mail._("send").post(request_body: mail.to_json)
    rescue Exception => e
      puts "************ ERROR ************"
      puts e.message
      puts "************ END ERROR ************"
    end
    puts response.status_code
    puts response.body
    puts response.headers
  end
end
