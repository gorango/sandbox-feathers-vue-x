const accountService = require('../../accounts/notifier')

module.exports = () => context => {
  if (!context.params.provider && !context.params.oauth) return context

  const user = context.result

  if (user) {
    accountService(context.app).notifier('verifySignup', user)
    return context
  }

  return context
}
