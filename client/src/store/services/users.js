export default function (feathersClient, service) {
  const servicePath = 'users'
  const servicePlugin = service(servicePath, {
    debug: !env('PROD'), // Enable some logging for debugging
    enableEvents: true, // Turn off socket event listeners. It's true by default
    addOnUpsert: true, // Add new records pushed by 'updated/patched' socketio events into store, instead of discarding them. It's false by default
    replaceItems: true, // If true, updates & patches replace the record in the store. Default is false, which merges in changes
    skipRequestIfExists: true, // For get action, if the record already exists in store, skip the remote request. It's false by default
    instanceDefaults: function (data, {store, Model, Models}) {
      return {
        uuid: null,
        googleId: null,
        facebookId: null,

        username: null,
        email: null,
        firstName: null,
        lastName: null,
        password: null,
        permissions: null,
        avatar: null,

        isVerified: null,
        verifyToken: null,
        verifyShortToken: null,
        verifyExpires: null,
        verifyChanges: null,
        resetToken: null,
        resetShortToken: null,
        resetExpires: null,

        createdAt: null,
        updatedAt: null,

        groups: 'ConvoGroup',
        followers: 'Relationship',
        follows: 'Relationship'
      }
    }
  })
  feathersClient.service(servicePath)

  return servicePlugin
}
