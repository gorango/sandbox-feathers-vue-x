const swagger = require('feathers-swagger')

module.exports = swagger({
  docsPath: '/docs',
  uiIndex: true,
  info: {
    title: 'Sandbox',
    description: 'API Documentation'
  }
})
