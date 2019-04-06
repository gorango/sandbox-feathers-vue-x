
// Hooks for service `messages`. (Can be re-generated.)
const commonHooks = require('feathers-hooks-common')
// eslint-disable-next-line no-unused-vars
const messagesPopulate = require('./messages.populate')
// !code: imports
const checkPermissions = require('feathers-permissions')

const authenticate = require('../../hooks/auth')
const initMessage = require('./hooks/init-message')
const ensureParticipant = require('./hooks/ensure-participant')
// !end

// !code: used
// eslint-disable-next-line no-unused-vars
const {iff, setNow, disallow, isProvider, every} = commonHooks
const isSeeding = ['--seed', '-s'].some(str => process.argv.slice(2).includes(str))
// !end

// !code: init // !end

let moduleExports = {
  before: {
    // !code: before
    all: [],
    find: [
      iff(
        isProvider('external'),
        authenticate(),
        checkPermissions({roles: ['admin'], error: false}),
        iff(
          ctx => !ctx.params.permitted,
          ensureParticipant()
        )
      )
    ],
    get: [authenticate()],
    create: [
      authenticate(),
      setNow('createdAt', 'updatedAt'),
      iff(!isSeeding, initMessage())
    ],
    update: [
      authenticate(),
      disallow('external'),
      setNow('updatedAt')
    ],
    patch: [
      authenticate(),
      setNow('updatedAt')
    ],
    remove: [
      authenticate(),
      disallow('external'),
      checkPermissions({roles: ['admin']})
    ]
    // !end
  },

  after: {
    // !code: after
    all: messagesPopulate,
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
