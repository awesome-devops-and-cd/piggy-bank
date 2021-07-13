const assert = require('assert')
const http = require('http')

describe('Entrypoint', function () {

  it('should be present', function () {
    assert.doesNotThrow(() => {
      const piggyBank = require('..')
    }, Error)
  })

  it('should be empty', function () {
    const piggyBank = require('..')
    assert.ok(piggyBank instanceof http.Server)
  })
})
