var assert = require('assert');

describe('Entrypoint', function () {

  it('should be present', function () {
    assert.doesNotThrow(() => {
      const piggyBank = require('..')
    }, Error)
  })

  it('should be empty', function () {
    const piggyBank = require('..')
    assert.deepStrictEqual(piggyBank, {})
  })
})
