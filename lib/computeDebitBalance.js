module.exports = { computeDebitBalance }

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
