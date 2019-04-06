export default function (feathersClient, service) {
  const servicePath = 'message-receipts'
  const servicePlugin = service(servicePath, {
    debug: !env('PROD'),
    enableEvents: true,
    addOnUpsert: false,
    replaceItems: false,
    skipRequestIfExists: false,
    instanceDefaults: function (data, {store, Model, Models}) {
      return {
        uuid: null,
        authorUuid: null,
        recipientUuid: null,
        messageUuid: null,
        convoUuid: null,
        groupUuid: null,

        seen: false,

        createdAt: null,

        author: 'User',
        recipient: 'User',
        message: 'Message',
        convo: 'Convo',
        group: 'ConvoGroup',
      }
    }
  })
  feathersClient.service(servicePath)

  return servicePlugin
}
