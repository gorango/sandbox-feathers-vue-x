const createService = require('feathers-sequelize')

const createModel = require('../../models/users.model')
const hooks = require('./users.hooks')
const {schema} = require('./users.schema')

let moduleExports = function (app) {
  let Model = createModel(app)
  let paginate = app.get('paginate')

  let options = {
    id: 'uuid',
    Model,
    // multi: true, // Sequelize-specific - allow multi updates
    paginate
  }

  const users = createService(options)
  users.docs = {
    definitions: {
      users: schema
    }
  }
  app.use('/users', users)

  const service = app.service('users')

  service.hooks(hooks)
}

module.exports = moduleExports
