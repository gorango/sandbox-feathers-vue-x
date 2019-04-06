
// Define the Feathers schema for service `messages`. (Can be re-generated.)
// !code: imports // !end
// !code: init // !end

// Define the model using JSON-schema
let schema = {
  // !<DEFAULT> code: schema_header
  title: 'Messages',
  description: 'Messages database.',
  // !end
  // !code: schema_definitions
  fakeRecords: 64,
  // !end

  // Required fields.
  required: [
    // !code: schema_required
    'authorUuid',
    'convoUuid',
    'body'
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
    convoUuid: {type: 'string', faker: {fk: 'convos:random:uuid'}},

    // In prod, we want to display a schema for the docs
    ...(process.env.NODE_ENV === 'production'
      ? {
        body: {type: 'string', faker: 'lorem.sentence'},
        type: {enum: ['text', 'link', 'media'], default: 'text'},
        link: {type: 'string', chance: 'url'},
        media: {type: 'string', faker: 'random.image'},
      }
      // In dev, we want to use the schema for fakes
      : {
        body: {type: 'string', faker: 'lorem.sentence'},
        oneOf: [
          {type: {enum: ['text']}},
          {type: {enum: ['link']},  link:  {type: 'string', faker: 'internet.url'}},
          {type: {enum: ['media']}, media: {type: 'string', faker: 'image.city'}}
        ]
      }
    ),

    createdAt: {$ref: 'common.json#/definitions/createdAt'},
    // !end
  },
  // !code: schema_more // !end
}

// Define optional, non-JSON-schema extensions.
let extensions = {
  // GraphQL generation.
  graphql: {
    // !code: graphql_header
    name: 'Message',
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
      convo:  {type: 'Convo!', relation: {ourTable: 'convoUuid', otherTable: 'uuid'}}
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
