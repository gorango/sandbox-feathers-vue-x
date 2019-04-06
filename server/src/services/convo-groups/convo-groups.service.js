const createService = require('feathers-sequelize')

const createModel = require('../../models/convo-groups.model')
const hooks = require('./convo-groups.hooks')
const {schema} = require('./convo-groups.schema')

let moduleExports = function (app) {
  let Model = createModel(app)
  let paginate = app.get('paginate')

  let options = {
    id: 'uuid',
    Model,
    // multi: true,
    paginate
  }

  const convoGroups = createService(options)
  convoGroups.docs = {
    definitions: {
      'convo-groups': schema
    }
  }
  app.use('/convo-groups', convoGroups)

  const service = app.service('convo-groups')

  service.hooks(hooks)
}

module.exports = moduleExports
