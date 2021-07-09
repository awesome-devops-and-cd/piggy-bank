module.exports = { computeBalances }

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
