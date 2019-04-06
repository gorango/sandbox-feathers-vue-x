/* eslint-disable no-console */
const {NODE_ENV} = process.env

process.env.NODE_ENV = NODE_ENV || 'production'
if (NODE_ENV !== 'production') {
  require('dotenv').config()
  console.clear()
}

const logger = require('./logger')
const app = require('./app')
const seedData = require('./seed-data')

const protocol = app.get('protocol')
const host = app.get('host')
const port = app.get('port')
const server = app.listen(port)

process.on('unhandledRejection', (reason, p) => {
  logger.error('Unhandled Rejection at: Promise ', p)
  console.log(reason)
})

server.on('listening', async () => {
  app.get('sequelizeSync')
    .then(() => {
      logger.info(`Feathers application started on ${protocol}://${host}:${port}`)
      seedData(app)
    })
    .catch(reason => {
      logger.error(reason)
      process.exit(1)
    })
})
