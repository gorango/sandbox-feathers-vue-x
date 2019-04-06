
// fgraphql populate hook for service `messages`. (Can be re-generated.)
const runTime = require('@feathers-plus/graphql/lib/run-time')
const { fgraphql, serialize } = require('feathers-hooks-common')
const { parse } = require('graphql')
// !code: graphql
const schema = require('../../services/graphql/graphql.schemas')
const resolvers = require('../../services/graphql/service.resolvers')
// !end
// !code: imports // !end
// !code: init // !end

const queries = {
  // No populate
  none: {},
  // All resolver fields 1 level deep.
  oneLevel: {
    query: {
      author: {},
      convo: {},
    }
  },
  // All resolver fields 2 levels deep.
  twoLevels: {
    query: {
      author: {
        groups: {},
        followers: {},
        follows: {},
      },
      convo: {
        messages: {},
        groups: {},
        receipts: {},
      },
    }
  },
  // !code: queries
  get default () {
    return {
      query: {
        author: {}
      }
    }
  }
  // !end
}

async function messagesPopulate (context) {
  // eslint-disable-next-line no-unused-vars
  const params = context.params
  let query, options, serializer

  if (params.$populate) { return context } // another populate is calling this service

  // !code: populate
  ({ query, options, serializer } = queries.default)

  // Example: allow client to provide the query
  if (params.$populateQuery) {
    ({ query, options, serializer } = params.$populateQuery)
  }

  // Populate the data.
  let newContext = await fgraphql({
    parse,
    runTime,
    schema,
    resolvers,
    recordType: 'Message',
    query,
    options,
  })(context)

  // Prune and sanitize the data.
  if (serializer) {
    newContext = serialize(serializer)(newContext)
  }

  // End the hook.
  return newContext
  // !end
}

// !code: more // !end
let moduleExports = messagesPopulate

// !code: exports // !end
module.exports = moduleExports

// !code: funcs // !end
// !code: end // !end

/* For your information: all record and resolver fields 2 levels deep.
const twoLevelsFields = {
  query: {
    uuid: 1,
    authorUuid: 1,
    convoUuid: 1,
    body: 1,
    oneOf: 1,
    createdAt: 1,
    author: {
      _args: {},
      uuid: 1,
      googleId: 1,
      facebookId: 1,
      email: 1,
      password: 1,
      permissions: 1,
      username: 1,
      avatar: 1,
      firstName: 1,
      lastName: 1,
      isVerified: 1,
      verifyToken: 1,
      verifyShortToken: 1,
      verifyExpires: 1,
      verifyChanges: 1,
      resetToken: 1,
      resetShortToken: 1,
      resetExpires: 1,
      createdAt: 1,
      updatedAt: 1,
      groups: {},
      followers: {},
      follows: {},
    },
    convo: {
      _args: {},
      uuid: 1,
      title: 1,
      createdAt: 1,
      messages: {},
      groups: {},
      receipts: {},
    },
  }
}
*/
