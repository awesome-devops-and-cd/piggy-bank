const express = require('express')
const parser = require('body-parser')
const logger = require('morgan')
const { validateHeaderValue } = require('http')
const { body, validationResult } = require('express-validator')
//const  body-parser = require('body-parser')

const { createFilterElement } = require('./lib/createFilterElement')

const expenses = []
const app = express()
  .use(logger('dev'))
  .use(parser.json())
  .use(express.static('web'))


app.post('/expenses',
  body('username').isString(),
  body('description').isString(),
  body('amount').isNumeric(),
  body('participants').isArray(),
  body('date').isLength({ min: 10 }).isString(),
  (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      console.log('The request is not valid', err)
      return res.status(400).json(err);
    }
    else {
      const expense = req.body
      expense.id = expenses.length
      expenses.push(expense)
      res.setHeader('Location', `/expenses/${expense.id}`) // fixme: this route is not yet implemented
      res.status(201).json(expense)
    }
  })

app.get('/expenses', (req, res) => {
  const filterElement = createFilterElement(req.query)
  res.setHeader('Content-Type', 'application/json')
  res.status(200).json(expenses.filter(filterElement))
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

module.exports = app.listen(process.env.npm_package_config_http_port, function () {
  console.log(`* server started on http://localhost:${process.env.npm_package_config_http_port}`)
})
