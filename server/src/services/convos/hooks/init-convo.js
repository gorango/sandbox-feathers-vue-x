const {checkContext, getItems, replaceItems} = require('feathers-hooks-common')
const uuid = require('uuid/v4')

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async (context) => {
    // Throw if the hook is being called from an unexpected location.
    checkContext(context, 'before', ['create'])

    const record = getItems(context)

    if (record.length) {
      throw new Error(`Cannot create more than one convo at a time`)
    }

    const {users} = record
    const convoUuid = uuid()

    if (!users || !users.length) {
      throw new Error(`Cannot create a convo without any users`)
    }

    for (const userUuid of users) {
      await context.app.service('convo-groups').create({convoUuid, userUuid})
    }


    delete record.users
    record.uuid = convoUuid

    replaceItems(context, record)
    return context
  }
}
