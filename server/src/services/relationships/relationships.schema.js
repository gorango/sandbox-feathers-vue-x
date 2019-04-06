
// Define the Feathers schema for service `relationships`. (Can be re-generated.)
// !code: imports // !end
// !code: init // !end

// Define the model using JSON-schema
let schema = {
  // !<DEFAULT> code: schema_header
  title: 'Relationships',
  description: 'Relationships database.',
  // !end
  // !code: schema_definitions // !end

  // Required fields.
  required: [
    // !code: schema_required
    'followerUuid',
    'followeeUuid'
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

    followerUuid: {type: 'string', faker: {fk: 'users:random:uuid'}},
    followeeUuid: {type: 'string', faker: {fk: 'users:random:uuid'}},

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
    name: 'Relationship',
    service: {
      sort: {createdAt: 1},
    },
    // !end
    discard: [
      // !code: graphql_discard // !end
    ],
    add: {
      // !code: graphql_add
      follower: {type: 'User!', relation: {ourTable: 'followerUuid', otherTable: 'uuid'}},
      followee: {type: 'User!', relation: {ourTable: 'followeeUuid', otherTable: 'uuid'}}
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
