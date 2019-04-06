
// Hooks for service `convoGroups`. (Can be re-generated.)
const commonHooks = require('feathers-hooks-common')
// eslint-disable-next-line no-unused-vars
const convoGroupsPopulate = require('./convo-groups.populate')
// !code: imports
const readReceipts = require('./hooks/read-receipts')
// !end

// !code: used
// eslint-disable-next-line no-unused-vars
const {iff, setNow} = commonHooks
// !end

// !code: init // !end

let moduleExports = {
  before: {
    // !code: before
    all: [],
    find: [],
    get: [],
    create: [
      setNow('createdAt', 'updatedAt'),
    ],
    update: [
      setNow('updatedAt'),
    ],
    patch: [
      readReceipts(),
      setNow('updatedAt'),
    ],
    remove: []
    // !end
  },

  after: {
    // !code: after
    all: convoGroupsPopulate,
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
