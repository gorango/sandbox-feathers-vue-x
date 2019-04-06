const assert = require('assert')
const app = require('../../src/app')

describe('\'convoGroups\' service', () => {
  it('registered the service', () => {
    const service = app.service('convo-groups')

    assert.ok(service, 'Registered the service')
  })
})
