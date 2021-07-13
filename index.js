const express = require('express')
const parser = require('body-parser')
const logger = require('morgan')

// database
const expenses = []

const app = express()
  .use(logger('dev'))
  .use(parser.json())
  .use(express.static('web'))

app.post('/expenses', (req, res) => {
  const expense = req.body
  expense.id = expenses.length
  expenses.push(expense)
  res.setHeader('Location', `/expenses/${expense.id}`) // fixme: this route is not yet implemented
  res.status(201).json(expense)
})

app.get('/expenses', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.json(expenses)
})

app.get('/expenses/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  const expense = expenses.find(({ id }) => id === parseInt(req.params.id))
  if (!expense) {
    res.status(404).json({ error: 'expense not found' })
    return
  }
  res.status(200).json(expense)

})

app.delete('/expenses/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  const index = expenses.findIndex(({ id }) => id === parseInt(req.params.id))

  if (index === -1) {
    res.status(404).json({ error: 'expense not found' })
    return
  }

  const expense = expenses[index]

  expenses.splice(index, 1)
  res.status(200).json(expense)
})

app.get('/*', (req, res) => {
  res.status(404).end('The requested route does not exist!')
})

module.exports = app.listen(3000, function () {
  console.log('* server started on http://localhost:3000')
})