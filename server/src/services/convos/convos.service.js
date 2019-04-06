const createService = require('feathers-sequelize')

const createModel = require('../../models/convos.model')
const hooks = require('./convos.hooks')
const {schema} = require('./convos.schema')

let moduleExports = function (app) {
  let Model = createModel(app)
  let paginate = app.get('paginate')

  let options = {
    id: 'uuid',
    Model,
    // multi: true,
    paginate
  }

  const convos = createService(options)
  convos.docs = {
    definitions: {
      convos: schema
    }
  }
  app.use('/convos', convos)

  const service = app.service('convos')

  service.hooks(hooks)
}

module.exports = moduleExports
