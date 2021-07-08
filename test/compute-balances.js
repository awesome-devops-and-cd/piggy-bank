const { deepStrictEqual } = require('assert')
const data = [
  {
    "username": "foo",
    "description": "coffee",
    "amount": 30,
    "participants": [
      "foo",
      "bar",
      "baz"
    ],
    "date": "2021-07-07T00:00:00.000Z"
  },
  {
    "username": "bar",
    "description": "coffee",
    "amount": 30,
    "participants": [
      "foo",
      "bar",
      "baz"
    ],
    "date": "2021-07-07T00:00:00.000Z"
  },
  {
    "username": "baz",
    "description": "paper",
    "amount": 20,
    "participants": [
      "foo",
      "baz"
    ],
    "date": "2021-07-07T00:00:00.000Z"
  }
]

describe('Compute User Balances', function () {
  it('returns an empty dictionary for an empty list of transactions', function () {
    const result = computeBalances([])
    deepStrictEqual(result, {})
  })
  it('creates ledger for a simple transaction', function () {
    const firstTransaction = data[0]
    const result = computeBalances([firstTransaction])
    deepStrictEqual(result, { foo: { bar: 10, baz: 10 } })
  })
  it('creates ledger for multiple transactions', function () {
    const firstTransaction = data[0]
    const secondTransaction = data[1]
    const result = computeBalances([firstTransaction, secondTransaction])
    deepStrictEqual(result, { foo: { bar: 10, baz: 10 }, bar: { foo: 10, baz: 10 } })
  })
  it('creates ledger for all transactions', function () {
    const result = computeBalances(data)
    deepStrictEqual(result, { foo: { bar: 10, baz: 10 }, bar: { foo: 10, baz: 10 }, baz: { foo: 10 } })
  })
})



describe('Compute User Balances', function () {
  it('returns an empty dictionary for an empty list of transactions', function () {
    const result = simplifyBalances({})
    deepStrictEqual(result, {})
  })
  it.skip('creates simplified ledger entires for multiple users', function () {
    const balances = { foo: { bar: 10, baz: 10 }, bar: { foo: 10, baz: 10 } }
    const result = simplifyBalances(balances)
    deepStrictEqual(result, { foo: { baz: 10 }, bar: { baz: 10 } })
  })
})

function simplifyBalances() {
  return {}
}

// this functions gives a list of users representing creditors and the respective borrowed amount
function computeBalances(transactions = []) {
  return transactions.reduce(reduceFunction, {} /* users */)

  function reduceFunction(users, transaction) {
    const { username, amount, participants } = transaction
    const equalShare = amount / participants.length

    if (!users[username]) users[username] = {}

    participants
      .filter(participant => participant !== username)
      .forEach(participant => {
        if (!users[username][participant]) users[username][participant] = 0
        users[username][participant] += equalShare
      })

    return users
  }
}
