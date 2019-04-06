const path = require('path')
const pug = require('pug')
const logger = require('../../logger')

module.exports = function (app) {
  const isProd = process.env.NODE_ENV === 'production'
  const host = app.get('host')
  const protocol = app.get('protocol')
  const returnEmail = 'info@sandbox.com'
  const emailTemplatesPath = path.join(__dirname, 'notifications')

  function sendEmail (user, {type, template, subject, vars, tokenKey, attachments = []}) {
    logger.info(`-- Sending ${type} email to ${user.firstName} (${user.email})`)
    let hashLink
    if (type) {
      let port = isProd ? '' : ':' + '8080'
      let hash = user[tokenKey]
      hashLink = `${protocol}://${host}${port}/${type}?key=${hash}`
    }
    const templatePath = path.join(emailTemplatesPath, `${template}.pug`)
    const html = pug.compileFile(templatePath)({
      ...(hashLink ? {hashLink} : {}),
      name: user.firstName,
      returnEmail,
      ...vars
    })
    return app.service('emails')
      .create({
        from: {name: 'Sandbox App', address: returnEmail},
        replyTo: returnEmail,
        to: `"${user.fullName}" <${user.email}>`,
        subject,
        attachments,
        html
      })
      .catch(err => { logger.error('Error sending email', err) })
  }

  return {
    notifier: function (type, user, vars = {}) {
      logger.debug(`send email ${type}`)
      switch (type) {
      case 'verifySignup':
        return sendEmail(user, {
          type: 'verify',
          template: 'verify-email',
          subject: 'Confirm Signup',
          tokenKey: 'verifyToken',
          vars
        })
      case 'verifiedSignup':
        return sendEmail(user, {
          template: 'email-verified',
          subject: 'Your email has been verified',
          tokenKey: '',
          vars
        })
      case 'sendResetPwd':
        return sendEmail(user, {
          type: 'reset',
          template: 'reset-password',
          subject: 'Reset Your Password',
          tokenKey: 'resetToken',
          vars
        })
      case 'resetPwd':
        return sendEmail(user, {
          template: 'password-was-reset',
          subject: 'Your Password Has Been Changed',
          tokenKey: '',
          vars
        })
      case 'passwordChange':
        return sendEmail(user, {
          template: 'password-was-changed',
          subject: 'Reset Your Password',
          tokenKey: '',
          vars
        })
      }
    }
  }
}
