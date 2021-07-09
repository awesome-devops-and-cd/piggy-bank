(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { getBase64 } = require('../lib/getBase64')

document.addEventListener('DOMContentLoaded', function onDomReady() {
  const username = document.getElementById('username')
  const description = document.getElementById('description')
  const amount = document.getElementById('amount')
  const participants = document.getElementById('participants')
  const date = document.getElementById('date')
  const image = document.getElementById('image')

  const submit = document.getElementById('submit')
  const form = document.getElementById('new-expense')

  date.valueAsDate = new Date()

  form.addEventListener('submit', event => event.preventDefault())
  submit.addEventListener('click', async function onFormSubmission() {
    const debug = document.getElementById('debug')
    const imgData = await getBase64(image.files[0])
    const jsObject = {
      username: username.value,
      description: description.value,
      amount: amount.valueAsNumber,
      participants: participants.value.split(','),
      date: date.valueAsDate,
      image: imgData
    }

    debug.innerText = JSON.stringify(jsObject, null, 2)
    document.getElementById("preview").src = imgData
  })
})


fetch('api/expenses.json', {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => {
    const tableBody = document.querySelector('tbody')

    const tableBodyFragment = document.createDocumentFragment()
    const tableBodyReplacement = document.createElement('tbody')

    tableBodyFragment.appendChild(tableBodyReplacement)

    data.forEach(element => {

      const row = tableBodyReplacement.insertRow()

      const username = row.insertCell(0)
      username.innerHTML = `<code>${element.username}</code>`

      const description = row.insertCell(1)
      description.innerText = element.description

      const amount = row.insertCell(2)
      amount.innerText = parseFloat(element.amount).toFixed(2) + ' €'

      const participants = row.insertCell(3)
      participants.innerHTML = element.participants
        .map(participant => `<code>${participant}</code>`)
        .join(' ')

      const date = row.insertCell(4)

      date.innerText = new Date(element.date).toISOString().substr(0, 10)

      const image = row.insertCell(5)

      image.innerHTML = `<a href=${element.image}> <img width="50" height="60" src="${element.image}"> </a>`
    })

    tableBody.parentNode.replaceChild(tableBodyFragment, tableBody)
  })


fetch('api/expenses.json', {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => {
    const { computeCreditBalance } = require('../lib/computeCreditBalance')
    const { computeDebitBalance } = require('../lib/computeDebitBalance')

    const credit = computeCreditBalance(data)
    const debit = computeDebitBalance(data)
    const userList = uniqueUsers(...Object.keys(credit), ...Object.keys(debit))
    const balances = computeBalances(userList, credit, debit)

    const usersElement = document.getElementById('users')
    const userFragment = document.createDocumentFragment()

    userList.forEach(user => {
      const details = document.createElement('details')
      details.appendChild(balanceUserSummary(user, balances[user].balance))
      details.appendChild(balanceListHeader('Credits'))
      details.appendChild(balanceList(balances[user].credit, '+'))
      details.appendChild(balanceListHeader('Debits'))
      details.appendChild(balanceList(balances[user].debit, '-'))
      userFragment.appendChild(details)
    })

    users.replaceChildren(userFragment)

    // #######################################

    // Remove from the balances the user with balance 0

    function filterZeroBalances(array) {
      return array.filter(innerArray => innerArray[1] !== 0);
    }

    // Sort the array based on the second element
    function SortBalances(array) {
      return array.sort(function (first, second) {
        return Math.abs(first[1]) - Math.abs(second[1]);
      })
    }

    var items = userList.reduce((items, user) => [...items, [user, balances[user].balance]], [])

    items = filterZeroBalances(items)
    items = SortBalances(items)

    var ul = document.getElementById("ul-track-op");

    while (items.length) {

      for (j = 1; j < items.length; j++) {
        if (items[0][1] * items[j][1] < 0) {

          items[j][1] += items[0][1]

          // create the steps for the UI
          if (items[0][1] < 0) {
            const ul = document.getElementById("ul-track-op");
            const li = document.createElement("li");
            li.appendChild(document.createTextNode(items[0][0] + " should give " + items[j][0] + " €" + Math.abs(items[0][1])));
            ul.appendChild(li);
          } else {
            const ul = document.getElementById("ul-track-op");
            const li = document.createElement("li");
            li.appendChild(document.createTextNode(items[j][0] + " should give " + items[0][0] + " €" + Math.abs(items[0][1])));
            ul.appendChild(li);
          }

          //compute the new balances
          items[0][1] = 0;
          break;
        }
      }

      items = filterZeroBalances(items)
      items = SortBalances(items)
    }


    // #######################################
  })

function uniqueUsers(...users) {
  return [...new Set(users)]
}

function balanceUserSummary(username, balance) {
  const summary = document.createElement('summary')
  const classColor = balance >= 0 ? 'positive' : 'negative'
  summary.innerHTML = `${username} <code class="${classColor}">${balance}€</code>`

  return summary
}

function balanceListHeader(title) {
  const header = document.createElement('h4')
  header.innerText = title
  return header
}

function balanceList(dictionary, prefix) {
  const list = document.createElement('ul')

  Object.keys(dictionary).forEach(user => {
    const listItem = document.createElement('li')
    listItem.innerHTML = `${user} ${prefix}${dictionary[user]}€`

    list.appendChild(listItem)
  })

  return list
}

},{"../lib/computeCreditBalance":2,"../lib/computeDebitBalance":3,"../lib/getBase64":4}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
module.exports = { getBase64 }

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

},{}]},{},[1]);
