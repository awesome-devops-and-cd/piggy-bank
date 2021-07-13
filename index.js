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

  if(expense.username =="" ||
      expense.description =="" ||
      expense.amount == "NaN" ||
      expense.participants =="")
  { 
    //window.alert("Empty field(s)!!")
    res.status(400).end("Bad request")
  }
  
  // to-do check the image and eventually put a default image
  expense.id = expenses.length
  expenses.push(expense)
  res.setHeader('Location', `/expenses/${expense.id}`) // fixme: this route is not yet implemented
  res.status(201).json(expense)
})


app.get('/expenses', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.json(expenses)
})

// ##############
app.get('/expenses/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.status(200)
  let tid = parseInt(req.params.id)
  res.json(expenses.find( x => x.id === tid))
})

app.delete('/expenses/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.status(200)
  let tid = parseInt(req.params.id)
  let index = expenses.findIndex( x => x.id === tid)
  expenses.splice(index, 1)
  res.end()
})


// #####


app.get('/*', (req, res) => {
  res.status(404).end('The requested route does not exist!')
})


module.exports = app.listen(3000, function () {
  console.log('* server started on http://localhost:3000')
})
