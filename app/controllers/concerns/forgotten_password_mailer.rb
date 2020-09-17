require "sendgrid-ruby"

class ForgottenPasswordMailer
  include SendGrid

  def forgotten_password(user, url)

    from = Email.new(email: "phil@gresham.dev")
    to = Email.new(email: user.email)
    subject = "Your password reset token for SignDocs"
    content = Content.new(type: "text/plain", value: "and easy to do anywhere, even with Ruby")
    mail = Mail.new(from, subject, to, content)

    sg = SendGrid::API.new(api_key: ENV["SENDGRID_API_KEY"])
    response = sg.client.mail._("send").post(request_body: mail.to_json)
    puts response.status_code
    puts response.body
    puts response.headers
  end
end
