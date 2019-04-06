
// Define the Feathers schema for service `users`. (Can be re-generated.)
// !code: imports // !end
// !code: init // !end

// Define the model using JSON-schema
let schema = {
  // !<DEFAULT> code: schema_header
  title: 'Users',
  description: 'Users database.',
  // !end
  // !code: schema_definitions
  fakeRecords: 20,
  // !end

  // Required fields.
  required: [
    // !code: schema_required
    'email',
    'password'
    // !end
  ],
  // Fields with unique values.
  uniqueItemProperties: [
    // !code: schema_unique
    'username',
    'email'
    // !end
  ],

  // Fields in the model.
  properties: {
    // !code: schema_properties
    uuid: {type: 'string', faker: 'random.uuid'},

    googleId: {type: 'string'},
    facebookId: {type: 'string', chance: 'fbid'},

    email: {type: 'string', format: 'email', faker: 'internet.email'},
    password: {type: 'string', faker: {plain: 'qwe'}},
    permissions: {type: 'string', enum: ['basic', 'admin'], default: 'basic'},
    username: {type: 'string', faker: 'internet.userName'},
    avatar: {type: 'string', faker: 'image.avatar'},

    firstName: {type: 'string', faker: 'name.firstName'},
    lastName: {type: 'string', faker: 'name.lastName'},

    isVerified: {type: 'boolean'},
    verifyToken: {type: 'string'},
    verifyShortToken: {type: 'string'},
    verifyExpires: {type: 'string', format: 'date-time'},
    verifyChanges: {type: 'object'},
    resetToken: {type: 'string'},
    resetShortToken: {type: 'string'},
    resetExpires: {type: 'string', format: 'date-time'},

    createdAt: {$ref: 'common.json#/definitions/createdAt'},
    updatedAt: {$ref: 'common.json#/definitions/updatedAt'},
    // !end
  },
  // !code: schema_more // !end
}

// Define optional, non-JSON-schema extensions.
let extensions = {
  // GraphQL generation.
  graphql: {
    // !code: graphql_header
    name: 'User',
    service: {
      sort: {createdAt: 1},
    },
    // !end
    discard: [
      // !code: graphql_discard
      // 'password'
      // !end
    ],
    add: {
      // !code: graphql_add
      groups: {type: '[ConvoGroup!]', relation: {ourTable: 'uuid', otherTable: 'userUuid'}},
      followers: {type: '[Relationship!]', relation: {ourTable: 'uuid', otherTable: 'followeeUuid'}},
      follows: {type: '[Relationship!]', relation: {ourTable: 'uuid', otherTable: 'followerUuid'}},
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
