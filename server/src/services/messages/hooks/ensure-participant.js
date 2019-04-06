const commonHooks = require('feathers-hooks-common')
const {Forbidden, NotFound, NotAuthenticated} = require('@feathersjs/errors')

const {isProvider, checkContext} = commonHooks

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async (context) => {
    checkContext(context, 'before', ['find'])

    const {convoUuid} = context.params.query
    if (!convoUuid) {
      return context
    }

    const convo = await context.app.service('convos').get(convoUuid)
    if (!convo || !convo.groups) {
      throw new NotFound(`Cannot find the requested conversation`)
    }

    const {uuid} = (context.params.user || {})
    if (isProvider('external')(context)) {
      if (!uuid) {
        throw new NotAuthenticated(`...`)
      }
    }

    const isParticipant = convo.groups.reduce((b, {userUuid}) => b || uuid === userUuid, false)
    if (!isParticipant) {
      throw new Forbidden(`Cannot read other users' messages`)
    }

    return context
  }
}
