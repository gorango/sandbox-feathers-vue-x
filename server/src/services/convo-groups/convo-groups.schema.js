
// Define the Feathers schema for service `convoGroups`. (Can be re-generated.)
// !code: imports // !end
// !code: init // !end

// Define the model using JSON-schema
let schema = {
  // !<DEFAULT> code: schema_header
  title: 'ConvoGroups',
  description: 'ConvoGroups database.',
  // !end
  // !code: schema_definitions
  fakeRecords: 16,
  // !end

  // Required fields.
  required: [
    // !code: schema_required
    'convoUuid',
    'userUuid'
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

    userUuid:  {faker: {fk: 'users:random:uuid'}},
    convoUuid: {faker: {fk: 'convos:random:uuid'}},

    status: {enum: ['live', 'muted', 'new', 'archived'], default: 'new'},

    createdAt: {$ref: 'common.json#/definitions/createdAt'},
    updatedAt: {$ref: 'common.json#/definitions/updatedAt'}
    // !end
  },
  // !code: schema_more // !end
}

// Define optional, non-JSON-schema extensions.
let extensions = {
  // GraphQL generation.
  graphql: {
    // !code: graphql_header
    name: 'ConvoGroup',
    service: {
      sort: {createdAt: 1},
    },
    // !end
    discard: [
      // !code: graphql_discard // !end
    ],
    add: {
      // !code: graphql_add
      user: {type: 'User!', relation: {ourTable: 'userUuid', otherTable: 'uuid'}},
      receipts: {type: '[MessageReceipt!]', relation: {ourTable: 'uuid', otherTable: 'groupUuid'}}
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
