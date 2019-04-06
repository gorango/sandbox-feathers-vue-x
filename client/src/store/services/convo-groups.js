export default function (feathersClient, service) {
  const servicePath = 'convo-groups'
  const servicePlugin = service(servicePath, {
    debug: !env('PROD'),
    enableEvents: true,
    addOnUpsert: false,
    replaceItems: false,
    skipRequestIfExists: false,
    instanceDefaults: function (data, {store, Model, Models}) {
      return {
        uuid: null,
        userUuid: null,
        convoUuid: null,

        status: null,
        createdAt: null,

        // user: 'User',
        receipts: 'MessageReceipt',
      }
    }
  })
  feathersClient.service(servicePath)

  return servicePlugin
}
