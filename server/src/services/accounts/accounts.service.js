const accountsManagement = require('feathers-authentication-management')

const notifier = require('./notifier')

module.exports = function (app) {
  app.configure(accountsManagement(notifier(app)))
  app.service('accounts')
}
