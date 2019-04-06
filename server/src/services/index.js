
// Configure the Feathers services. (Can be re-generated.)
let convoGroups = require('./convo-groups/convo-groups.service')
let convos = require('./convos/convos.service')
let messageReceipts = require('./message-receipts/message-receipts.service')
let messages = require('./messages/messages.service')
let relationships = require('./relationships/relationships.service')
let users = require('./users/users.service')

// !code: imports
let accounts = require('./accounts/accounts.service')
let emails = require('./emails/emails.service')
// !end
// !code: init // !end

// eslint-disable-next-line no-unused-vars
let moduleExports = function (app) {
  app.configure(convoGroups)
  app.configure(convos)
  app.configure(messageReceipts)
  app.configure(messages)
  app.configure(relationships)
  app.configure(users)
  // !code: func_return
  app.configure(accounts)
  app.configure(emails)
  // !end
}

// !code: exports // !end
module.exports = moduleExports

// !code: funcs // !end
// !code: end // !end
