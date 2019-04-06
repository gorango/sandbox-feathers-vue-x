// See https://github.com/winstonjs/winston for doc
const logger = require('../logger')
const {ERROR} = require('feathers-sequelize')
const util = require('util')

if (process.env.LOG) {
  logger.level = process.env.LOG
}

module.exports = function () {
  return (context) => {
    logger.debug(`${context.type} app.service('${context.path}').${context.method}()`)

    if (typeof context.toJSON === 'function' && logger.level === 'debug') {
      const {
        method, path, app, service, // eslint-disable-line no-unused-vars
        type,
        params,
        arguments, // eslint-disable-line
        ...rest
      } = context
      const payload = {
        type,
        // arguments: arguments.map(({user, ...arg}) => JSON.parse(JSON.stringify(arg))),
        params: {
          ...params,
          ...(params.user ? {user: !!params.user} : {})
        },
        ...rest
      }
      logger.info(util.inspect(payload, false, null, true))
    }

    if (context.error) {
      logger.error(context.error.stack)
      logger.error(context.error[ERROR])
    }
  }
}
