module.exports = { computeCreditBalance }

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
