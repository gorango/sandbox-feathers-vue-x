export default function (feathersClient, service) {
  const servicePath = 'messages'
  const servicePlugin = service(servicePath, {
    debug: !env('PROD'),
    enableEvents: true,
    addOnUpsert: true,
    replaceItems: true,
    skipRequestIfExists: true,
    instanceDefaults: function (data, {store, Model, Models}) {
      return {
        uuid: null,
        authorUuid: null,
        convoUuid: null,

        body: null,
        createdAt: null,

        author: 'User',
        convo: 'Convo'
      }
    }
  })
  feathersClient.service(servicePath)

  return servicePlugin
}
