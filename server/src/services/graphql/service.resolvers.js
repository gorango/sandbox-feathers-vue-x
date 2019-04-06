
/* eslint-disable no-unused-vars, indent */
// Define GraphQL resolvers using only Feathers services. (Can be re-generated.)
// !code: imports // !end
// !code: init // !end

let moduleExports = function serviceResolvers(app, options) {
  const {convertArgsToFeathers, extractAllItems, extractFirstItem} = options
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

  let returns = {

    ConvoGroup: {

      // user(query: JSON, params: JSON, key: JSON): User!
      user:
        // !<DEFAULT> code: resolver-ConvoGroup-user
        (parent, args, content, ast) => {
          const feathersParams = convertArgs(args, content, ast, {
            query: { uuid: parent.userUuid }, paginate: false
          })
          return users.find(feathersParams).then(extractFirstItem)
        },
        // !end

      // receipts(query: JSON, params: JSON, key: JSON): [MessageReceipt!]
      receipts:
        // !<DEFAULT> code: resolver-ConvoGroup-receipts
        (parent, args, content, ast) => {
          const feathersParams = convertArgs(args, content, ast, {
            query: { groupUuid: parent.uuid, $sort: undefined }, paginate: false
          })
          return messageReceipts.find(feathersParams).then(extractAllItems)
        },
        // !end
    },

    Convo: {

      // messages(query: JSON, params: JSON, key: JSON): [Message!]
      messages:
        // !<DEFAULT> code: resolver-Convo-messages
        (parent, args, content, ast) => {
          const feathersParams = convertArgs(args, content, ast, {
            query: { convoUuid: parent.uuid, $sort: undefined }, paginate: false
          })
          return messages.find(feathersParams).then(extractAllItems)
        },
        // !end

      // groups(query: JSON, params: JSON, key: JSON): [ConvoGroup!]
      groups:
        // !<DEFAULT> code: resolver-Convo-groups
        (parent, args, content, ast) => {
          const feathersParams = convertArgs(args, content, ast, {
            query: { convoUuid: parent.uuid, $sort: undefined }, paginate: false
          })
          return convoGroups.find(feathersParams).then(extractAllItems)
        },
        // !end

      // receipts(query: JSON, params: JSON, key: JSON): [MessageReceipt]
      receipts:
        // !<DEFAULT> code: resolver-Convo-receipts
        (parent, args, content, ast) => {
          const feathersParams = convertArgs(args, content, ast, {
            query: { convoUuid: parent.uuid, $sort: undefined }, paginate: false
          })
          return messageReceipts.find(feathersParams).then(extractAllItems)
        },
        // !end
    },

    MessageReceipt: {

      // author(query: JSON, params: JSON, key: JSON): User!
      author:
        // !<DEFAULT> code: resolver-MessageReceipt-author
        (parent, args, content, ast) => {
          const feathersParams = convertArgs(args, content, ast, {
            query: { uuid: parent.authorUuid }, paginate: false
          })
          return users.find(feathersParams).then(extractFirstItem)
        },
        // !end

      // recipient(query: JSON, params: JSON, key: JSON): User!
      recipient:
        // !<DEFAULT> code: resolver-MessageReceipt-recipient
        (parent, args, content, ast) => {
          const feathersParams = convertArgs(args, content, ast, {
            query: { uuid: parent.recipientUuid }, paginate: false
          })
          return users.find(feathersParams).then(extractFirstItem)
        },
        // !end

      // message(query: JSON, params: JSON, key: JSON): Message!
      message:
        // !<DEFAULT> code: resolver-MessageReceipt-message
        (parent, args, content, ast) => {
          const feathersParams = convertArgs(args, content, ast, {
            query: { uuid: parent.messageUuid }, paginate: false
          })
          return messages.find(feathersParams).then(extractFirstItem)
        },
        // !end

      // convo(query: JSON, params: JSON, key: JSON): Convo!
      convo:
        // !<DEFAULT> code: resolver-MessageReceipt-convo
        (parent, args, content, ast) => {
          const feathersParams = convertArgs(args, content, ast, {
            query: { uuid: parent.convoUuid }, paginate: false
          })
          return convos.find(feathersParams).then(extractFirstItem)
        },
        // !end

      // group(query: JSON, params: JSON, key: JSON): ConvoGroup!
      group:
        // !<DEFAULT> code: resolver-MessageReceipt-group
        (parent, args, content, ast) => {
          const feathersParams = convertArgs(args, content, ast, {
            query: { uuid: parent.groupUuid }, paginate: false
          })
          return convoGroups.find(feathersParams).then(extractFirstItem)
        },
        // !end
    },

    Message: {

      // author(query: JSON, params: JSON, key: JSON): User!
      author:
        // !<DEFAULT> code: resolver-Message-author
        (parent, args, content, ast) => {
          const feathersParams = convertArgs(args, content, ast, {
            query: { uuid: parent.authorUuid }, paginate: false
          })
          return users.find(feathersParams).then(extractFirstItem)
        },
        // !end

      // convo(query: JSON, params: JSON, key: JSON): Convo!
      convo:
        // !<DEFAULT> code: resolver-Message-convo
        (parent, args, content, ast) => {
          const feathersParams = convertArgs(args, content, ast, {
            query: { uuid: parent.convoUuid }, paginate: false
          })
          return convos.find(feathersParams).then(extractFirstItem)
        },
        // !end
    },

    Relationship: {

      // follower(query: JSON, params: JSON, key: JSON): User!
      follower:
        // !<DEFAULT> code: resolver-Relationship-follower
        (parent, args, content, ast) => {
          const feathersParams = convertArgs(args, content, ast, {
            query: { uuid: parent.followerUuid }, paginate: false
          })
          return users.find(feathersParams).then(extractFirstItem)
        },
        // !end

      // followee(query: JSON, params: JSON, key: JSON): User!
      followee:
        // !<DEFAULT> code: resolver-Relationship-followee
        (parent, args, content, ast) => {
          const feathersParams = convertArgs(args, content, ast, {
            query: { uuid: parent.followeeUuid }, paginate: false
          })
          return users.find(feathersParams).then(extractFirstItem)
        },
        // !end
    },

    User: {

      // groups(query: JSON, params: JSON, key: JSON): [ConvoGroup!]
      groups:
        // !<DEFAULT> code: resolver-User-groups
        (parent, args, content, ast) => {
          const feathersParams = convertArgs(args, content, ast, {
            query: { userUuid: parent.uuid, $sort: undefined }, paginate: false
          })
          return convoGroups.find(feathersParams).then(extractAllItems)
        },
        // !end

      // followers(query: JSON, params: JSON, key: JSON): [Relationship!]
      followers:
        // !<DEFAULT> code: resolver-User-followers
        (parent, args, content, ast) => {
          const feathersParams = convertArgs(args, content, ast, {
            query: { followeeUuid: parent.uuid, $sort: undefined }, paginate: false
          })
          return relationships.find(feathersParams).then(extractAllItems)
        },
        // !end

      // follows(query: JSON, params: JSON, key: JSON): [Relationship!]
      follows:
        // !<DEFAULT> code: resolver-User-follows
        (parent, args, content, ast) => {
          const feathersParams = convertArgs(args, content, ast, {
            query: { followerUuid: parent.uuid, $sort: undefined }, paginate: false
          })
          return relationships.find(feathersParams).then(extractAllItems)
        },
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
