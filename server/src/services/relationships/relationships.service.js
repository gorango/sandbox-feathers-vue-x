const createService = require('feathers-sequelize')

const createModel = require('../../models/relationships.model')
const hooks = require('./relationships.hooks')
const {schema} = require('./relationships.schema')

let moduleExports = function (app) {
  let Model = createModel(app)
  let paginate = app.get('paginate')

  let options = {
    id: 'uuid',
    Model,
    // multi: true,
    paginate
  }

  const relationships = createService(options)
  relationships.docs = {
    definitions: {
      relationships: schema
    }
  }
  app.use('/relationships', relationships)

  const service = app.service('relationships')

  service.hooks(hooks)
}

module.exports = moduleExports
