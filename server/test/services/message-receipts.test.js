const assert = require('assert')
const app = require('../../src/app')

describe('\'messageReceipts\' service', () => {
  it('registered the service', () => {
    const service = app.service('message-receipts')

    assert.ok(service, 'Registered the service')
  })
})
