
/* eslint-disable no-unused-vars */
// Define GraphQL resolvers using Feathers services and BatchLoaders. (Can be re-generated.)
const { getByDot, setByDot } = require('feathers-hooks-common')
// !code: imports // !end
// !code: init // !end

let moduleExports = function batchLoaderResolvers(app, options) {
  // eslint-disable-next-line
  let { convertArgsToParams, convertArgsToFeathers, extractAllItems, extractFirstItem,
    feathersBatchLoader: { feathersBatchLoader } } = options

  // !<DEFAULT> code: max-batch-size
  let defaultPaginate = app.get('paginate')
  let maxBatchSize = defaultPaginate && typeof defaultPaginate.max === 'number' ?
    defaultPaginate.max : undefined
  // !end

  // !<DEFAULT> code: extra_auth_props
  const convertArgs = convertArgsToFeathers([])
  // !end

  // !<DEFAULT> code: services
  let convoGroups = app.service('/convo-groups')
  let convos = app.service('/convos')
  let messageReceipts = app.service('/message-receipts')
  let messages = app.service('/messages')
  let relationships = app.service('/relationships')
  let users = app.service('/users')
  // !end

  // !<DEFAULT> code: get-result
  // Given a fieldName in the parent record, return the result from a BatchLoader
  // The result will be an object (or null), or an array of objects (possibly empty).
  function getResult(batchLoaderName, fieldName, isArray) {
    const contentByDot = `batchLoaders.${batchLoaderName}`

    // `content.app = app` is the Feathers app object.
    // `content.batchLoaders = {}` is where the BatchLoaders for a request are stored.
    return (parent, args, content, ast) => {
      let batchLoader = getByDot(content, contentByDot)

      if (!batchLoader) {
        batchLoader = getBatchLoader(batchLoaderName, parent, args, content, ast)
        setByDot(content, contentByDot, batchLoader)
      }

      const returns1 = batchLoader.load(parent[fieldName])
      return !isArray ? returns1 : returns1.then(result => result || [])
    }
  }
  // !end

  // A transient BatchLoader can be created only when (one of) its resolver has been called,
  // as the BatchLoader loading function may require data from the 'args' passed to the resolver.
  // Note that each resolver's 'args' are static throughout a GraphQL call.
  function getBatchLoader(dataLoaderName, parent, args, content, ast) {
    let feathersParams

    switch (dataLoaderName) {
    /* Persistent BatchLoaders. Stored in `content.batchLoaders._persisted`. */
    // !<DEFAULT> code: bl-persisted
    // case '_persisted.user.one.id': // service user, returns one object, key is field id
    // !end

    /* Transient BatchLoaders shared among resolvers. Stored in `content.batchLoaders._shared`. */
    // !<DEFAULT> code: bl-shared
    // *.*: User
    // case '_shared.user.one.id': // service user, returns one object, key is field id
    // !end

    /* Transient BatchLoaders used by only one resolver. Stored in `content.batchLoaders`. */

    // ConvoGroup.user(query: JSON, params: JSON, key: JSON): User!
    // !<DEFAULT> code: bl-ConvoGroup-user
    case 'ConvoGroup.user':
      return feathersBatchLoader(dataLoaderName, '!', 'uuid',
        keys => {
          feathersParams = convertArgs(args, content, null, {
            query: { uuid: { $in: keys }, $sort: undefined },
            _populate: 'skip', paginate: false
          })
          return users.find(feathersParams)
        },
        maxBatchSize // Max #keys in a BatchLoader func call.
      )
      // !end

    // ConvoGroup.receipts(query: JSON, params: JSON, key: JSON): [MessageReceipt!]
    // !<DEFAULT> code: bl-ConvoGroup-receipts
    case 'ConvoGroup.receipts':
      return feathersBatchLoader(dataLoaderName, '[!]', 'groupUuid',
        keys => {
          feathersParams = convertArgs(args, content, null, {
            query: { groupUuid: { $in: keys }, $sort: undefined },
            _populate: 'skip', paginate: false
          })
          return messageReceipts.find(feathersParams)
        },
        maxBatchSize // Max #keys in a BatchLoader func call.
      )
      // !end

    // Convo.messages(query: JSON, params: JSON, key: JSON): [Message!]
    // !<DEFAULT> code: bl-Convo-messages
    case 'Convo.messages':
      return feathersBatchLoader(dataLoaderName, '[!]', 'convoUuid',
        keys => {
          feathersParams = convertArgs(args, content, null, {
            query: { convoUuid: { $in: keys }, $sort: undefined },
            _populate: 'skip', paginate: false
          })
          return messages.find(feathersParams)
        },
        maxBatchSize // Max #keys in a BatchLoader func call.
      )
      // !end

    // Convo.groups(query: JSON, params: JSON, key: JSON): [ConvoGroup!]
    // !<DEFAULT> code: bl-Convo-groups
    case 'Convo.groups':
      return feathersBatchLoader(dataLoaderName, '[!]', 'convoUuid',
        keys => {
          feathersParams = convertArgs(args, content, null, {
            query: { convoUuid: { $in: keys }, $sort: undefined },
            _populate: 'skip', paginate: false
          })
          return convoGroups.find(feathersParams)
        },
        maxBatchSize // Max #keys in a BatchLoader func call.
      )
      // !end

    // Convo.receipts(query: JSON, params: JSON, key: JSON): [MessageReceipt]
    // !<DEFAULT> code: bl-Convo-receipts
    case 'Convo.receipts':
      return feathersBatchLoader(dataLoaderName, '[!]', 'convoUuid',
        keys => {
          feathersParams = convertArgs(args, content, null, {
            query: { convoUuid: { $in: keys }, $sort: undefined },
            _populate: 'skip', paginate: false
          })
          return messageReceipts.find(feathersParams)
        },
        maxBatchSize // Max #keys in a BatchLoader func call.
      )
      // !end

    // MessageReceipt.author(query: JSON, params: JSON, key: JSON): User!
    // !<DEFAULT> code: bl-MessageReceipt-author
    case 'MessageReceipt.author':
      return feathersBatchLoader(dataLoaderName, '!', 'uuid',
        keys => {
          feathersParams = convertArgs(args, content, null, {
            query: { uuid: { $in: keys }, $sort: undefined },
            _populate: 'skip', paginate: false
          })
          return users.find(feathersParams)
        },
        maxBatchSize // Max #keys in a BatchLoader func call.
      )
      // !end

    // MessageReceipt.recipient(query: JSON, params: JSON, key: JSON): User!
    // !<DEFAULT> code: bl-MessageReceipt-recipient
    case 'MessageReceipt.recipient':
      return feathersBatchLoader(dataLoaderName, '!', 'uuid',
        keys => {
          feathersParams = convertArgs(args, content, null, {
            query: { uuid: { $in: keys }, $sort: undefined },
            _populate: 'skip', paginate: false
          })
          return users.find(feathersParams)
        },
        maxBatchSize // Max #keys in a BatchLoader func call.
      )
      // !end

    // MessageReceipt.message(query: JSON, params: JSON, key: JSON): Message!
    // !<DEFAULT> code: bl-MessageReceipt-message
    case 'MessageReceipt.message':
      return feathersBatchLoader(dataLoaderName, '!', 'uuid',
        keys => {
          feathersParams = convertArgs(args, content, null, {
            query: { uuid: { $in: keys }, $sort: undefined },
            _populate: 'skip', paginate: false
          })
          return messages.find(feathersParams)
        },
        maxBatchSize // Max #keys in a BatchLoader func call.
      )
      // !end

    // MessageReceipt.convo(query: JSON, params: JSON, key: JSON): Convo!
    // !<DEFAULT> code: bl-MessageReceipt-convo
    case 'MessageReceipt.convo':
      return feathersBatchLoader(dataLoaderName, '!', 'uuid',
        keys => {
          feathersParams = convertArgs(args, content, null, {
            query: { uuid: { $in: keys }, $sort: undefined },
            _populate: 'skip', paginate: false
          })
          return convos.find(feathersParams)
        },
        maxBatchSize // Max #keys in a BatchLoader func call.
      )
      // !end

    // MessageReceipt.group(query: JSON, params: JSON, key: JSON): ConvoGroup!
    // !<DEFAULT> code: bl-MessageReceipt-group
    case 'MessageReceipt.group':
      return feathersBatchLoader(dataLoaderName, '!', 'uuid',
        keys => {
          feathersParams = convertArgs(args, content, null, {
            query: { uuid: { $in: keys }, $sort: undefined },
            _populate: 'skip', paginate: false
          })
          return convoGroups.find(feathersParams)
        },
        maxBatchSize // Max #keys in a BatchLoader func call.
      )
      // !end

    // Message.author(query: JSON, params: JSON, key: JSON): User!
    // !<DEFAULT> code: bl-Message-author
    case 'Message.author':
      return feathersBatchLoader(dataLoaderName, '!', 'uuid',
        keys => {
          feathersParams = convertArgs(args, content, null, {
            query: { uuid: { $in: keys }, $sort: undefined },
            _populate: 'skip', paginate: false
          })
          return users.find(feathersParams)
        },
        maxBatchSize // Max #keys in a BatchLoader func call.
      )
      // !end

    // Message.convo(query: JSON, params: JSON, key: JSON): Convo!
    // !<DEFAULT> code: bl-Message-convo
    case 'Message.convo':
      return feathersBatchLoader(dataLoaderName, '!', 'uuid',
        keys => {
          feathersParams = convertArgs(args, content, null, {
            query: { uuid: { $in: keys }, $sort: undefined },
            _populate: 'skip', paginate: false
          })
          return convos.find(feathersParams)
        },
        maxBatchSize // Max #keys in a BatchLoader func call.
      )
      // !end

    // Relationship.follower(query: JSON, params: JSON, key: JSON): User!
    // !<DEFAULT> code: bl-Relationship-follower
    case 'Relationship.follower':
      return feathersBatchLoader(dataLoaderName, '!', 'uuid',
        keys => {
          feathersParams = convertArgs(args, content, null, {
            query: { uuid: { $in: keys }, $sort: undefined },
            _populate: 'skip', paginate: false
          })
          return users.find(feathersParams)
        },
        maxBatchSize // Max #keys in a BatchLoader func call.
      )
      // !end

    // Relationship.followee(query: JSON, params: JSON, key: JSON): User!
    // !<DEFAULT> code: bl-Relationship-followee
    case 'Relationship.followee':
      return feathersBatchLoader(dataLoaderName, '!', 'uuid',
        keys => {
          feathersParams = convertArgs(args, content, null, {
            query: { uuid: { $in: keys }, $sort: undefined },
            _populate: 'skip', paginate: false
          })
          return users.find(feathersParams)
        },
        maxBatchSize // Max #keys in a BatchLoader func call.
      )
      // !end

    // User.groups(query: JSON, params: JSON, key: JSON): [ConvoGroup!]
    // !<DEFAULT> code: bl-User-groups
    case 'User.groups':
      return feathersBatchLoader(dataLoaderName, '[!]', 'userUuid',
        keys => {
          feathersParams = convertArgs(args, content, null, {
            query: { userUuid: { $in: keys }, $sort: undefined },
            _populate: 'skip', paginate: false
          })
          return convoGroups.find(feathersParams)
        },
        maxBatchSize // Max #keys in a BatchLoader func call.
      )
      // !end

    // User.followers(query: JSON, params: JSON, key: JSON): [Relationship!]
    // !<DEFAULT> code: bl-User-followers
    case 'User.followers':
      return feathersBatchLoader(dataLoaderName, '[!]', 'followeeUuid',
        keys => {
          feathersParams = convertArgs(args, content, null, {
            query: { followeeUuid: { $in: keys }, $sort: undefined },
            _populate: 'skip', paginate: false
          })
          return relationships.find(feathersParams)
        },
        maxBatchSize // Max #keys in a BatchLoader func call.
      )
      // !end

    // User.follows(query: JSON, params: JSON, key: JSON): [Relationship!]
    // !<DEFAULT> code: bl-User-follows
    case 'User.follows':
      return feathersBatchLoader(dataLoaderName, '[!]', 'followerUuid',
        keys => {
          feathersParams = convertArgs(args, content, null, {
            query: { followerUuid: { $in: keys }, $sort: undefined },
            _populate: 'skip', paginate: false
          })
          return relationships.find(feathersParams)
        },
        maxBatchSize // Max #keys in a BatchLoader func call.
      )
      // !end

    /* Throw on unknown BatchLoader name. */
    default:
      // !<DEFAULT> code: bl-default
      throw new Error(`GraphQL query requires BatchLoader named '${dataLoaderName}' but no definition exists for it.`)
      // !end
    }
  }

  let returns = {

    ConvoGroup: {

      // user(query: JSON, params: JSON, key: JSON): User!
      // !<DEFAULT> code: resolver-ConvoGroup-user
      user: getResult('ConvoGroup.user', 'userUuid'),
      // !end

      // receipts(query: JSON, params: JSON, key: JSON): [MessageReceipt!]
      // !<DEFAULT> code: resolver-ConvoGroup-receipts
      receipts: getResult('ConvoGroup.receipts', 'uuid', true),
      // !end
    },

    Convo: {

      // messages(query: JSON, params: JSON, key: JSON): [Message!]
      // !<DEFAULT> code: resolver-Convo-messages
      messages: getResult('Convo.messages', 'uuid', true),
      // !end

      // groups(query: JSON, params: JSON, key: JSON): [ConvoGroup!]
      // !<DEFAULT> code: resolver-Convo-groups
      groups: getResult('Convo.groups', 'uuid', true),
      // !end

      // receipts(query: JSON, params: JSON, key: JSON): [MessageReceipt]
      // !<DEFAULT> code: resolver-Convo-receipts
      receipts: getResult('Convo.receipts', 'uuid', true),
      // !end
    },

    MessageReceipt: {

      // author(query: JSON, params: JSON, key: JSON): User!
      // !<DEFAULT> code: resolver-MessageReceipt-author
      author: getResult('MessageReceipt.author', 'authorUuid'),
      // !end

      // recipient(query: JSON, params: JSON, key: JSON): User!
      // !<DEFAULT> code: resolver-MessageReceipt-recipient
      recipient: getResult('MessageReceipt.recipient', 'recipientUuid'),
      // !end

      // message(query: JSON, params: JSON, key: JSON): Message!
      // !<DEFAULT> code: resolver-MessageReceipt-message
      message: getResult('MessageReceipt.message', 'messageUuid'),
      // !end

      // convo(query: JSON, params: JSON, key: JSON): Convo!
      // !<DEFAULT> code: resolver-MessageReceipt-convo
      convo: getResult('MessageReceipt.convo', 'convoUuid'),
      // !end

      // group(query: JSON, params: JSON, key: JSON): ConvoGroup!
      // !<DEFAULT> code: resolver-MessageReceipt-group
      group: getResult('MessageReceipt.group', 'groupUuid'),
      // !end
    },

    Message: {

      // author(query: JSON, params: JSON, key: JSON): User!
      // !<DEFAULT> code: resolver-Message-author
      author: getResult('Message.author', 'authorUuid'),
      // !end

      // convo(query: JSON, params: JSON, key: JSON): Convo!
      // !<DEFAULT> code: resolver-Message-convo
      convo: getResult('Message.convo', 'convoUuid'),
      // !end
    },

    Relationship: {

      // follower(query: JSON, params: JSON, key: JSON): User!
      // !<DEFAULT> code: resolver-Relationship-follower
      follower: getResult('Relationship.follower', 'followerUuid'),
      // !end

      // followee(query: JSON, params: JSON, key: JSON): User!
      // !<DEFAULT> code: resolver-Relationship-followee
      followee: getResult('Relationship.followee', 'followeeUuid'),
      // !end
    },

    User: {

      // groups(query: JSON, params: JSON, key: JSON): [ConvoGroup!]
      // !<DEFAULT> code: resolver-User-groups
      groups: getResult('User.groups', 'uuid', true),
      // !end

      // followers(query: JSON, params: JSON, key: JSON): [Relationship!]
      // !<DEFAULT> code: resolver-User-followers
      followers: getResult('User.followers', 'uuid', true),
      // !end

      // follows(query: JSON, params: JSON, key: JSON): [Relationship!]
      // !<DEFAULT> code: resolver-User-follows
      follows: getResult('User.follows', 'uuid', true),
      // !end
    },

    // !code: resolver_field_more // !end
    Query: {

      // !<DEFAULT> code: query-ConvoGroup
      // getConvoGroup(query: JSON, params: JSON, key: JSON): ConvoGroup
      getConvoGroup(parent, args, content, ast) {
        const feathersParams = convertArgs(args, content, ast)
        return convoGroups.get(args.key, feathersParams).then(extractFirstItem)
      },

      // findConvoGroup(query: JSON, params: JSON): [ConvoGroup!]
      findConvoGroup(parent, args, content, ast) {
        const feathersParams = convertArgs(args, content, ast, { query: { $sort: {   createdAt: 1 } } })
        return convoGroups.find(feathersParams).then(paginate(content)).then(extractAllItems)
      },
      // !end

      // !<DEFAULT> code: query-Convo
      // getConvo(query: JSON, params: JSON, key: JSON): Convo
      getConvo(parent, args, content, ast) {
        const feathersParams = convertArgs(args, content, ast)
        return convos.get(args.key, feathersParams).then(extractFirstItem)
      },

      // findConvo(query: JSON, params: JSON): [Convo!]
      findConvo(parent, args, content, ast) {
        const feathersParams = convertArgs(args, content, ast, { query: { $sort: {   createdAt: 1 } } })
        return convos.find(feathersParams).then(paginate(content)).then(extractAllItems)
      },
      // !end

      // !<DEFAULT> code: query-MessageReceipt
      // getMessageReceipt(query: JSON, params: JSON, key: JSON): MessageReceipt
      getMessageReceipt(parent, args, content, ast) {
        const feathersParams = convertArgs(args, content, ast)
        return messageReceipts.get(args.key, feathersParams).then(extractFirstItem)
      },

      // findMessageReceipt(query: JSON, params: JSON): [MessageReceipt!]
      findMessageReceipt(parent, args, content, ast) {
        const feathersParams = convertArgs(args, content, ast, { query: { $sort: {   createdAt: 1 } } })
        return messageReceipts.find(feathersParams).then(paginate(content)).then(extractAllItems)
      },
      // !end

      // !<DEFAULT> code: query-Message
      // getMessage(query: JSON, params: JSON, key: JSON): Message
      getMessage(parent, args, content, ast) {
        const feathersParams = convertArgs(args, content, ast)
        return messages.get(args.key, feathersParams).then(extractFirstItem)
      },

      // findMessage(query: JSON, params: JSON): [Message!]
      findMessage(parent, args, content, ast) {
        const feathersParams = convertArgs(args, content, ast, { query: { $sort: {   createdAt: 1 } } })
        return messages.find(feathersParams).then(paginate(content)).then(extractAllItems)
      },
      // !end

      // !<DEFAULT> code: query-Relationship
      // getRelationship(query: JSON, params: JSON, key: JSON): Relationship
      getRelationship(parent, args, content, ast) {
        const feathersParams = convertArgs(args, content, ast)
        return relationships.get(args.key, feathersParams).then(extractFirstItem)
      },

      // findRelationship(query: JSON, params: JSON): [Relationship!]
      findRelationship(parent, args, content, ast) {
        const feathersParams = convertArgs(args, content, ast, { query: { $sort: {   createdAt: 1 } } })
        return relationships.find(feathersParams).then(paginate(content)).then(extractAllItems)
      },
      // !end

      // !<DEFAULT> code: query-User
      // getUser(query: JSON, params: JSON, key: JSON): User
      getUser(parent, args, content, ast) {
        const feathersParams = convertArgs(args, content, ast)
        return users.get(args.key, feathersParams).then(extractFirstItem)
      },

      // findUser(query: JSON, params: JSON): [User!]
      findUser(parent, args, content, ast) {
        const feathersParams = convertArgs(args, content, ast, { query: { $sort: {   createdAt: 1 } } })
        return users.find(feathersParams).then(paginate(content)).then(extractAllItems)
      },
      // !end
      // !code: resolver_query_more // !end
    },
  }

  // !code: func_return // !end
  return returns
}

// !code: more // !end

// !code: exports // !end
module.exports = moduleExports

function paginate(content) {
  return result => {
    content.pagination = !result.data ? undefined : {
      total: result.total,
      limit: result.limit,
      skip: result.skip,
    }

    return result
  }
}

// !code: funcs // !end
// !code: end // !end
