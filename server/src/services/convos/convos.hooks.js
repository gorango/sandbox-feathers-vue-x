
// Hooks for service `convos`. (Can be re-generated.)
const commonHooks = require('feathers-hooks-common')
// eslint-disable-next-line no-unused-vars
const convosPopulate = require('./convos.populate')
// !code: imports
const initConvo = require('./hooks/init-convo')
// !end

// !code: used
// eslint-disable-next-line no-unused-vars
const {iff, setNow} = commonHooks
// !end

// !code: init
const isSeeding = ['--seed', '-s'].some(str => process.argv.slice(2).includes(str))
// !end

let moduleExports = {
  before: {
    // !code: before
    all: [],
    find: [],
    get: [],
    create: [
      setNow('createdAt', 'updatedAt'),
      iff(
        !isSeeding,
        initConvo()
      )
    ],
    update: [
      setNow('updatedAt')
    ],
    patch: [
      setNow('updatedAt')
    ],
    remove: []
    // !end
  },

  after: {
    // !code: after
    all: [
      convosPopulate,
    ],
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
