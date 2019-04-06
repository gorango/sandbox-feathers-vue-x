const Mailer = require('feathers-mailer')
const smtpTransport = require('nodemailer-smtp-transport')

const hooks = require('./emails.hooks')

module.exports = function (app) {
  let emailService

  emailService = Mailer(smtpTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    ...(process.ENV === 'production' ? {secure: true} : {}),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  }))

  app.use('/emails', emailService)

  const service = app.service('emails')

  service.hooks(hooks)
}
