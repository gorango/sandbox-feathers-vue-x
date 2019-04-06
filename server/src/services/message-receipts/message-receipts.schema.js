
// Define the Feathers schema for service `messageReceipts`. (Can be re-generated.)
// !code: imports // !end
// !code: init // !end

// Define the model using JSON-schema
let schema = {
  // !<DEFAULT> code: schema_header
  title: 'MessageReceipts',
  description: 'MessageReceipts database.',
  // !end
  // !code: schema_definitions
  fakeRecords: 0,
  // !end

  // Required fields.
  required: [
    // !code: schema_required
    'authorUuid',
    'recipientUuid',
    'messageUuid',
    'convoUuid',
    'groupUuid',
    // !end
  ],
  // Fields with unique values.
  uniqueItemProperties: [
    // !code: schema_unique // !end
  ],

  // Fields in the model.
  properties: {
    // !code: schema_properties
    uuid: {type: 'string', faker: 'random.uuid'},

    authorUuid: {type: 'string', faker: {fk: 'users:random:uuid'}},
    recipientUuid: {type: 'string', faker: {fk: 'users:random:uuid'}},
    messageUuid: {type: 'string', faker: {fk: 'messages:random:uuid'}},
    convoUuid: {type: 'string', faker: {fk: 'convos:random:uuid'}},
    groupUuid: {type: 'string', faker: {fk: 'convoGroups:random:uuid'}},

    seen: {type: 'boolean', default: false},

    createdAt: {$ref: 'common.json#/definitions/createdAt'}
    // !end
  },
  // !code: schema_more // !end
}

// Define optional, non-JSON-schema extensions.
let extensions = {
  // GraphQL generation.
  graphql: {
    // !code: graphql_header
    name: 'MessageReceipt',
    service: {
      sort: {createdAt: 1},
    },
    // !end
    discard: [
      // !code: graphql_discard // !end
    ],
    add: {
      // !code: graphql_add
      author: {type: 'User!', relation: {ourTable: 'authorUuid', otherTable: 'uuid'}},
      recipient: {type: 'User!', relation: {ourTable: 'recipientUuid', otherTable: 'uuid'}},
      message: {type: 'Message!', relation: {ourTable: 'messageUuid', otherTable: 'uuid'}},
      convo: {type: 'Convo!', relation: {ourTable: 'convoUuid', otherTable: 'uuid'}},
      group: {type: 'ConvoGroup!', relation: {ourTable: 'groupUuid', otherTable: 'uuid'}},
      // !end
    },
    // !code: graphql_more // !end
  },
}

// !code: more // !end

let moduleExports = {
  schema,
  extensions,
  // !code: moduleExports // !end
}

// !code: exports // !end
module.exports = moduleExports

// !code: funcs // !end
// !code: end // !end
