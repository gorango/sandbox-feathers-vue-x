export default function (feathersClient, service) {
  const servicePath = 'convos'
  const servicePlugin = service(servicePath, {
    debug: !env('PROD'),
    enableEvents: true,
    addOnUpsert: false,
    replaceItems: false,
    skipRequestIfExists: false,
    instanceDefaults: function (data, {store, Model, Models}) {
      return {
        uuid: null,

        title: null,
        createdAt: null,

        messages: 'Message',
        groups: 'ConvoGroup',

        get displayTitle () {
          const {uuid} = store.state.auth.user
          if (this.groups && uuid) {
            // make an array of usernames (this could be firstnames, etc)
            const participants = this.groups.reduce((arr, {user}) =>
              // filter out logged in user
              user.uuid === uuid ? arr : [...arr, user.username], [])
            const remaining = participants.slice(2).length
            const suffix = `and ${remaining} other${remaining > 1 ? 's' : ''}`
            const title = participants.slice(0, 2).join(remaining ? ', ' : ' and ')
            if (remaining) {
              return `${title} ${suffix}`
            }
            return title
          }
          return this.title
        },

        get unseen () {
          const {uuid} = store.state.auth.user
          const group = ((this.groups && this.groups.filter(({userUuid}) => userUuid === uuid)) || [])[0]
          if (group && group.receipts) {
            return group.receipts.filter(({seen}) => !seen).length
          }
        }
      }
    }
  })
  feathersClient.service(servicePath)

  return servicePlugin
}
