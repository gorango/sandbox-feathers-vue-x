const {checkContext, getItems, replaceItems} = require('feathers-hooks-common')
const {Forbidden} = require('@feathersjs/errors')
const uuid = require('uuid/v4')

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async (context) => {
    checkContext(context, 'before', ['create'])

    const record = getItems(context)

    if (record.length) {
      throw new Forbidden('Cannot create more than one message at a time')
    }

    const {authorUuid, convoUuid} = record

    // create message-receipts
    const allRecipients = await context.app.service('convo-groups').find({query: {convoUuid}, paginate: false})
    const recipients = allRecipients.filter(({userUuid}) => userUuid !== authorUuid)
    const messageUuid = uuid()
    for (const recipient of recipients) {
      const {userUuid: recipientUuid, uuid: groupUuid} = recipient
      const messageReceipt = {authorUuid, recipientUuid, messageUuid, convoUuid, groupUuid}
      await context.app.service('message-receipts').create(messageReceipt)
    }

    // bump convo's updated stamp
    await context.app.service('convos').patch(convoUuid, {})

    replaceItems(context, record)
    return context
  }
}
