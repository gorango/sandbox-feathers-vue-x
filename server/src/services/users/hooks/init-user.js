const {checkContext, getItems, replaceItems} = require('feathers-hooks-common')
const uuid = require('uuid/v4')

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async (context) => {
    checkContext(context, 'before', ['create'])

    const record = getItems(context)

    if (record.length) {
      throw new Error(`Cannot create more than one user at a time`)
    }

    const ownerUuid = uuid()

    const {email} = record
    const username = `${email.split('@')[0]}${ownerUuid.split('-')[0]}`

    record.uuid = ownerUuid
    record.username = username

    // create some fake convos when a user signs up
    const {data: demoUsers} = await context.app.service('users').find({query: {$sort: {createdAt: 1}, $limit: 3}})

    const convo1 = await context.app.service('convos').create({users: [ownerUuid, ...demoUsers.map(({uuid}) => uuid)]})
    await context.app.service('messages').create({convoUuid: convo1.uuid, authorUuid: demoUsers[0].uuid, body: 'Hi there!'})
    await context.app.service('messages').create({convoUuid: convo1.uuid, authorUuid: demoUsers[1].uuid, body: 'Got some fresh meat over here...'})
    await context.app.service('messages').create({convoUuid: convo1.uuid, authorUuid: demoUsers[2].uuid, body: 'Welcome :)'})

    const convo2 = await context.app.service('convos').create({users: [ownerUuid, demoUsers[1].uuid]})
    await context.app.service('messages').create({convoUuid: convo2.uuid, authorUuid: demoUsers[1].uuid, body: 'Hey pal!'})

    replaceItems(context, record)

    return context
  }
}
