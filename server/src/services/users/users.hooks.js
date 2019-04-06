
// Hooks for service `users`. (Can be re-generated.)
const commonHooks = require('feathers-hooks-common')
// eslint-disable-next-line no-unused-vars
const {hashPassword, protect} = require('@feathersjs/authentication-local').hooks
// eslint-disable-next-line no-unused-vars
const usersPopulate = require('./users.populate')
// !code: imports
const {addVerification, removeVerification} = require('feathers-authentication-management').hooks
const checkPermissions = require('feathers-permissions')
const {restrictToOwner} = require('feathers-authentication-hooks')

const authenticate = require('../../hooks/auth')
const handleUpload = require('../../hooks/upload')
const initUser = require('./hooks/init-user')
const verifySocial = require('./hooks/verify-social')
const sendVerificationEmail = require('./hooks/send-verification-email')
// !end

// !code: used
// eslint-disable-next-line no-unused-vars
const {setNow, disallow, iff, isProvider, preventChanges} = commonHooks
const isSeeding = ['--seed', '-s'].some(str => process.argv.slice(2).includes(str))
// !end

// !code: init // !end

let moduleExports = {
  before: {
    // !code: before
    all: [],
    find: [],
    get: [],
    create: [
      iff(!isSeeding, initUser()),
      setNow('createdAt', 'updatedAt'),
      verifySocial(),
      addVerification(),
      hashPassword()
    ],
    update: [
      disallow('external'),
      setNow('updatedAt')
    ],
    patch: [
      authenticate(),
      checkPermissions({roles: ['admin'], error: false}),
      iff(
        ({params}) => !params.permitted,
        restrictToOwner({idField: 'uuid', ownerField: 'uuid'})
      ),
      handleUpload(),
      setNow('updatedAt'),
      verifySocial(),
      preventChanges(
        isProvider('external'),
        'email', 'role',
        'isVerified', 'verifyToken', 'verifyShortToken', 'verifyExpires', 'verifyChanges',
        'resetToken', 'resetShortToken', 'resetExpires'
      ),
      hashPassword()
    ],
    remove: [
      disallow('external'),
      checkPermissions({roles: ['admin']})
    ]
    // !end
  },

  after: {
    // !code: after
    all: [
      usersPopulate,
      protect('password') // Must always be the last hook
    ],
    find: [],
    get: [],
    create: [
      iff(
        isProvider('external'),
        sendVerificationEmail(),
        removeVerification()
      ),
    ],
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
