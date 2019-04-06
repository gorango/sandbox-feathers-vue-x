const {checkContext, getItems} = require('feathers-hooks-common')

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async (context) => {
    // Throw if the hook is being called from an unexpected location.
    checkContext(context, 'before', ['patch'])

    const record = getItems(context)

    if (record.length) {
      throw new Error(`Cannot patch more than one convo-group at a time`)
    }

    const {userUuid: recipientUuid} = record

    if (recipientUuid) {
      const {data} = (await context.app.service('message-receipts').find({query: {recipientUuid, seen: false}}) || {})
      if (data && data.length) {
        await context.app.service('message-receipts').patch(null, {seen: true}, {query: {recipientUuid}})
      }
    }

    return context
  }
}
