class ForgottenPasswordMailer < ApplicationMailer
  def forgotten_password
    @url = params[:url]
    @user = params[:user]
    mail(to: @user.email, subject: "Your password reset token for SignDocs")
    return
  end
end
