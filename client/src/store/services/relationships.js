export default function (feathersClient, service) {
  const servicePath = 'relationships'
  const servicePlugin = service(servicePath, {
    debug: !env('PROD'),
    enableEvents: true,
    addOnUpsert: true,
    replaceItems: true,
    skipRequestIfExists: true,
    instanceDefaults: function (data, {store, Model, Models}) {
      return {
        uuid: null,

        followerUuid: null,
        followeeUuid: null,

        createdAt: null,

        // follower: 'User',
        // followee: 'User'
      }
    }
  })
  feathersClient.service(servicePath)

  return servicePlugin
}
