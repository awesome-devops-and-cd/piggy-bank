const { createServer } = require('http')

const expenses = []

createServer(requestLister)
  .listen(3000, function () {
    console.log('-- server has started and is listening on http://localhost:3000')
  })

function requestLister(request, response) {
  console.log('-- a request has been made to this server', request.url)

  if (request.url === '/expenses' && request.method === 'POST') {
    toJson(request, expense => {
      expense.id = expenses.length
      response.writeHead(201, { 'Content-Type': 'application/json', 'Location': `/expenses/${expense.id}` })
      expenses.push(expense)
      response.end(JSON.stringify(expense))
    })
    return
  }

  if (request.url === '/expenses' && request.method === 'GET') {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(expenses))
    return
  }

  response.writeHead(404, {
    'Content-Type': 'text/plain'
  })

  response.end('Not found')
}


function toJson(req, callbackFunction, { concat } = Buffer) {
  const buffer = []
  req.on('data', (data) => buffer.push(data))
  req.on('end', () => {
    const json = JSON.parse(concat(buffer))
    callbackFunction(json)
  })
}
