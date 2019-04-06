
// fgraphql populate hook for service `convos`. (Can be re-generated.)
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
      messages: {},
      groups: {},
      receipts: {},
    }
  },
  // All resolver fields 2 levels deep.
  twoLevels: {
    query: {
      messages: {
        author: {},
        convo: {},
      },
      groups: {
        user: {},
        receipts: {},
      },
      receipts: {
        author: {},
        recipient: {},
        message: {},
        convo: {},
        group: {},
      },
    }
  },
  // !code: queries
  get default () {
    return {
      query: {
        messages: {
          _args: {query: {$limit: 1, $sort: {createdAt: -1}}},
          author: {}
        },
        groups: {
          user: {},
          receipts: {}
        }
      }
    }
  }
  // !end
}

async function convosPopulate (context) {
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
    recordType: 'Convo',
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
let moduleExports = convosPopulate

// !code: exports // !end
module.exports = moduleExports

// !code: funcs // !end
// !code: end // !end

/* For your information: all record and resolver fields 2 levels deep.
const twoLevelsFields = {
  query: {
    uuid: 1,
    title: 1,
    createdAt: 1,
    messages: {
      _args: {},
      uuid: 1,
      authorUuid: 1,
      convoUuid: 1,
      body: 1,
      oneOf: 1,
      createdAt: 1,
      author: {},
      convo: {},
    },
    groups: {
      _args: {},
      uuid: 1,
      userUuid: 1,
      convoUuid: 1,
      status: 1,
      createdAt: 1,
      updatedAt: 1,
      user: {},
      receipts: {},
    },
    receipts: {
      _args: {},
      uuid: 1,
      authorUuid: 1,
      recipientUuid: 1,
      messageUuid: 1,
      convoUuid: 1,
      groupUuid: 1,
      seen: 1,
      createdAt: 1,
      author: {},
      recipient: {},
      message: {},
      convo: {},
      group: {},
    },
  }
}
*/
