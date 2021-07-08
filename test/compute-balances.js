const { deepStrictEqual, equal } = require('assert')
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

describe('Compute User Credit', function () {
  it('returns an empty dictionary for an empty list of transactions', function () {
    const result = computeCreditBalance([])
    deepStrictEqual(result, {})
  })
  it('creates ledger for a simple transaction', function () {
    const firstTransaction = data[0]
    const result = computeCreditBalance([firstTransaction])
    deepStrictEqual(result, { foo: { bar: 10, baz: 10 } })
  })
  it('creates ledger for multiple transactions', function () {
    const firstTransaction = data[0]
    const secondTransaction = data[1]
    const result = computeCreditBalance([firstTransaction, secondTransaction])
    deepStrictEqual(result, { foo: { bar: 10, baz: 10 }, bar: { foo: 10, baz: 10 } })
  })
  it('creates ledger for all transactions', function () {
    const result = computeCreditBalance(data)
    deepStrictEqual(result, { foo: { bar: 10, baz: 10 }, bar: { foo: 10, baz: 10 }, baz: { foo: 10 } })
  })
})

describe('Compute User Debit', function () {
  it('returns an empty dictionary for an empty list of transactions', function () {
    const result = computeDebitBalance([])
    deepStrictEqual(result, {})
  })
  it('creates ledger for a simple transaction', function () {
    const firstTransaction = data[0]
    const result = computeDebitBalance([firstTransaction])
    deepStrictEqual(result, { bar: { foo: 10 }, baz: { foo: 10 } })
  })
  it('creates ledger for multiple transactions', function () {
    const firstTransaction = data[0]
    const secondTransaction = data[1]
    const result = computeDebitBalance([firstTransaction, secondTransaction])
    deepStrictEqual(result, { bar: { foo: 10 }, baz: { bar: 10, foo: 10 }, foo: { bar: 10 } })
  })
  it('creates ledger for all transactions', function () {
    const result = computeDebitBalance(data)
    deepStrictEqual(result, { bar: { foo: 10 }, baz: { bar: 10, foo: 10 }, foo: { bar: 10, baz: 10 } })
  })
})

describe('Compute User Balance', function () {
  it('returns an empty dictionary for an empty list of transactions', function () {
    const result = computeBalances([], {}, {})
    deepStrictEqual(result, {})
  })

  it('credit debit balances for a single transaction', () => {
    const transactions = [data[0]]
    const credit = computeCreditBalance(transactions)
    const debit = computeDebitBalance(transactions)
    const result = computeBalances(['foo', 'bar', 'baz'], credit, debit)
    deepStrictEqual(result, {
      bar: { balance: -10, credit: {}, debit: { foo: 10 } },
      baz: { balance: -10, credit: {}, debit: { foo: 10 } },
      foo: { balance: 20, credit: { bar: 10, baz: 10 }, debit: {} }
    })
  })

  it('credit debit balances for a single transaction', () => {
    const transactions = [data[0], data[1]]
    const credit = computeCreditBalance(transactions)
    const debit = computeDebitBalance(transactions)
    const result = computeBalances(['foo', 'bar', 'baz'], credit, debit)
    deepStrictEqual(result, {
      bar: { balance: 10, credit: { baz: 10, foo: 10 }, debit: { foo: 10 } },
      baz: { balance: -20, credit: {}, debit: { foo: 10, bar: 10 } },
      foo: { balance: 10, credit: { bar: 10, baz: 10 }, debit: { bar: 10 } }
    })
  })
})

function computeBalances(users, credit, debit) {
  return users.reduce(toDebitAndCreditBalancesByUser, {})

  function toDebitAndCreditBalancesByUser(balances, user) {
    const userCredit = credit[user] || {}
    const userDebit = debit[user] || {}
    balances[user] = {
      credit: userCredit,
      debit: userDebit,
      balance: sumValues(userCredit) - sumValues(userDebit)
    }

    return balances
  }

  function sumValues(object) {
    return Object.values(object).reduce((sum, number) => (sum + number), 0)
  }
}

function computeDebitBalance(transactions = []) {
  return transactions.reduce(toDebitBalancesByUser, {} /* users */)

  function toDebitBalancesByUser(users, transaction) {
    const { username, amount, participants } = transaction
    const equalShare = amount / participants.length

    participants
      .filter(participant => participant !== username)
      .forEach(participant => {
        if (!users[participant]) users[participant] = {}
        if (!users[participant][username]) users[participant][username] = 0
        users[participant][username] += equalShare
      })

    return users
  }
}

function computeCreditBalance(transactions = []) {
  return transactions.reduce(toCreditBalancesByUser, {})

  function toCreditBalancesByUser(users, { username, amount, participants }) {
    const equalShare = amount / participants.length
    participants
      .filter(participant => participant !== username)
      .forEach(participant => {
        if (!users[username]) users[username] = {}
        if (!users[username][participant]) users[username][participant] = 0
        users[username][participant] += equalShare
      })

    return users
  }
}
