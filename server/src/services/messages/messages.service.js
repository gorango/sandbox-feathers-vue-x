const createService = require('feathers-sequelize')

const createModel = require('../../models/messages.model')
const hooks = require('./messages.hooks')
const {schema} = require('./messages.schema')

let moduleExports = function (app) {
  let Model = createModel(app)
  let paginate = app.get('paginate')

  let options = {
    id: 'uuid',
    Model,
    // multi: true,
    paginate
  }

  const messages = createService(options)
  messages.docs = {
    definitions: {
      messages: schema
    }
  }
  app.use('/messages', messages)

  const service = app.service('messages')

  service.hooks(hooks)
}

module.exports = moduleExports
