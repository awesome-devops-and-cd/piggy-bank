module.exports = { createFilterElement }


function createFilterElement(query) {
  const { username, description, lowerAmount, upperAmount, partecipant, fromDate, toDate } = query

  return function filterElement(el) {
    var usernameFilter = username == null ? true : el.username == username
    var descriptionFilter = description == null ? true : el.description == description
    var lowerAmountFilter = lowerAmount == null ? true : el.amount >= lowerAmount
    var upperAmountFilter = upperAmount == null ? true : el.amount <= upperAmount
    var partecipantFilter = partecipant == null ? true : el.participants.includes(partecipant)
    var fromDateFilter = fromDate == null ? true : new Date(el.date) >= new Date(fromDate)
    var toDateFilter = toDate == null ? true : new Date(el.date) <= new Date(toDate)

    return usernameFilter && descriptionFilter && lowerAmountFilter && upperAmountFilter && partecipantFilter && fromDateFilter && toDateFilter
  }
}
