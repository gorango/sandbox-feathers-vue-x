
// Configure authentication. (Can be re-generated.)
const authentication = require('@feathersjs/authentication')
const jwt = require('@feathersjs/authentication-jwt')
const local = require('@feathersjs/authentication-local')
const oauth2 = require('@feathersjs/authentication-oauth2')
const GoogleStrategy = require('passport-google-oauth20')
const FacebookStrategy = require('passport-facebook')

// !code: imports
const authManagement = require('feathers-authentication-management')
// !end
// !code: init // !end

let moduleExports = function (app) {
  const config = app.get('authentication')
  // !code: func_init // !end

  // Set up authentication with the secret
  app.configure(authentication(config))
  app.configure(jwt())
  app.configure(local())
  // !code: loc_1
  app.configure(authManagement({path: 'accounts'}))
  // !end

  app.configure(oauth2(Object.assign({
    name: 'google',
    Strategy: GoogleStrategy,
    // !code: google_options // !end
  }, config.google)))

  app.configure(oauth2(Object.assign({
    name: 'facebook',
    Strategy: FacebookStrategy,
    // !code: facebook_options // !end
  }, config.facebook)))

  // !code: loc_2 // !end

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    before: {
      create: [
        // !<DEFAULT> code: before_create
        authentication.hooks.authenticate(config.strategies),
        // !end
      ],
      remove: [
        // !<DEFAULT> code: before_remove
        authentication.hooks.authenticate('jwt'),
        // !end
      ],
      // !code: before // !end
    },
    // !code: after // !end
  })
  // !code: func_return // !end
}

// !code: exports // !end
module.exports = moduleExports

// !code: funcs // !end
// !code: end // !end
