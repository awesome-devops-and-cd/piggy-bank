const express = require('express')
const parser = require('body-parser')
const logger = require('morgan')
const { validateHeaderValue }= require('http')
const { body, validationResult } = require('express-validator')
//const  body-parser = require('body-parser')

// database
const expenses = []

const app = express()
  .use(logger('dev'))
  .use(parser.json())
  .use(express.static('web'))


app.post('/expenses', 
  body('username').isString(), 
  body('description').isString(),
  body('amount').isNumeric(),
  body('participants').isString(),
  body('date').isLength({min: 10 }).isDate(),
  //body('image').isAlphanumeric(), 
  (req, res) => {   
  console.log(req.body)
  const err = validationResult(req);  
  if (!err.isEmpty()) {
    console.log('The request is not valid', err)
    return res.status(400).json(err);}
  else { const expense = req.body
    expense.id = expenses.length
    expenses.push(expense)
    res.setHeader('Location', `/expenses/${expense.id}`) // fixme: this route is not yet implemented
    res.status(201).json(expense)
  }
  /*Expenses.create({
    username: req.body.username,
    description: req.body.description,
    amount: req.body.amount,
    participants: req.body.participants,
    date: req.body.date,}).then(expenses => res.json(expenses));*/
})

app.get('/expenses', (req, res) => {
  //const err = validateHeaderValue('Content-Type', 'application/json')
  if (!err.isEmpty()){
    console.log('The request is not valid', err)
    return res.status(400).json(err);
  }
  else{
  res.setHeader('Content-Type', 'application/json')
  res.json(expenses)}
})

app.get('/*', (req, res) => {
  res.status(404).end('The requested route does not exist!')
})

module.exports = app.listen(3000, function () {
  console.log('* server started on http://localhost:3000')
})
