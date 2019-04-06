const assert = require('assert')
const app = require('../../src/app')

describe('\'convos\' service', () => {
  it('registered the service', () => {
    const service = app.service('convos')

    assert.ok(service, 'Registered the service')
  })
})
