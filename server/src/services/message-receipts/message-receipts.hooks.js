
// Hooks for service `messageReceipts`. (Can be re-generated.)
const commonHooks = require('feathers-hooks-common')
// eslint-disable-next-line no-unused-vars
const messageReceiptsPopulate = require('./message-receipts.populate')
// !code: imports
// const checkPermissions = require('feathers-permissions')

// const authenticate = require('../../hooks/auth')
// const {restrictToOwner} = require('feathers-authentication-hooks')
// !end

// !code: used
// eslint-disable-next-line no-unused-vars
const {iff, setNow, disallow, isProvider, every} = commonHooks
// !end

// !code: init // !end

let moduleExports = {
  before: {
    // !code: before
    all: [
      // authenticate(),
      // checkPermissions({roles: ['admin'], error: false}),
      // iff(
      //   ctx => !ctx.params.permitted,
      //   restrictToOwner({idField: 'uuid', ownerField: 'uuid'})
      // )
    ],
    find: [],
    get: [],
    create: [
      setNow('createdAt', 'updatedAt'),
    ],
    update: [
      setNow('updatedAt'),
    ],
    patch: [
      setNow('updatedAt'),
    ],
    remove: []
    // !end
  },

  after: {
    // !code: after
    all: messageReceiptsPopulate,
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
    // !end
  },

  error: {
    // !code: error
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
    // !end
  },
  // !code: moduleExports // !end
}

// !code: exports // !end
module.exports = moduleExports

// !code: funcs // !end
// !code: end // !end
