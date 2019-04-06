const createService = require('feathers-sequelize')

const createModel = require('../../models/message-receipts.model')
const hooks = require('./message-receipts.hooks')
const {schema} = require('./message-receipts.schema')

let moduleExports = function (app) {
  let Model = createModel(app)
  let paginate = app.get('paginate')

  let options = {
    id: 'uuid',
    Model,
    multi: true,
    paginate
  }

  const messageReceipts = createService(options)
  messageReceipts.docs = {
    definitions: {
      'message-receipts': schema
    }
  }
  app.use('/message-receipts', messageReceipts)

  const service = app.service('message-receipts')

  service.hooks(hooks)
}

module.exports = moduleExports
