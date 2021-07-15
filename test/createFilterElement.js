const { strictEqual, strict } = require('assert')

describe('.createFilterElement', () => {
  const { createFilterElement } = require('../lib/createFilterElement')

  it('matches usernames', () => {
    const query = { username: 'foo' }
    const filterElement = createFilterElement(query)

    strictEqual(filterElement({ username: 'bar' }), false)
    strictEqual(filterElement({ username: 'foo' }), true)
  })

  it('matches descriptions', () => {
    const query = { description: 'lorem ipsum' }
    const filterElement = createFilterElement(query)

    strictEqual(filterElement({ description: 'dolor sit amet' }), false)
    strictEqual(filterElement({ description: 'lorem ipsum' }), true)
  })
})
