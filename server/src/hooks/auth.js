
const {authenticate} = require('@feathersjs/authentication').hooks
const {NotAuthenticated} = require('@feathersjs/errors')

const verifyIdentity = authenticate('jwt')

function hasToken (context) {
  const res = context.data.accessToken || (context.params.headers && context.params.headers.authorization)
  return res
}

module.exports = function () {
  return async (context) => {
    try {
      const res = await verifyIdentity(context)
      return res
    } catch (error) {
      if (error instanceof NotAuthenticated && hasToken(context)) {
        return context
      }
      throw error
    }
  }
}
