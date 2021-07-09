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
  const { computeCreditBalance } = require('../lib/computeCreditBalance')

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
  const { computeDebitBalance } = require('../lib/computeDebitBalance')

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
  const { computeCreditBalance } = require('../lib/computeCreditBalance')
  const { computeDebitBalance } = require('../lib/computeDebitBalance')
  const { computeBalances } = require('../lib/computeBalances')

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
