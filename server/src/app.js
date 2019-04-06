const compress = require('compression')
const cors = require('cors')
const helmet = require('helmet')
const logger = require('./logger')
const swagger = require('./swagger')

const feathers = require('@feathersjs/feathers')
const configuration = require('@feathersjs/configuration')
const express = require('@feathersjs/express')
const socketio = require('@feathersjs/socketio')

const services = require('./services')
const appHooks = require('./app.hooks')
const channels = require('./channels')
const generatorSpecs = require('../feathers-gen-specs.json')
const authentication = require('./authentication')

const sequelize = require('./sequelize')

const app = express(feathers())

app.configure(configuration())
app.set('generatorSpecs', generatorSpecs)

app.use(helmet())
app.use(cors())
app.use(compress())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (_, res) => res.sendStatus(200))

app.configure(express.rest())
app.configure(socketio())

app.configure(swagger)

app.configure(sequelize)

app.configure(authentication)
app.configure(services)
app.configure(channels)

app.use(express.errorHandler({
  logger,
  html: false
}))

app.hooks(appHooks)

const moduleExports = app

module.exports = moduleExports
