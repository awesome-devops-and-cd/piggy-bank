const request = require('supertest')
const { deepStrictEqual } = require('assert')

describe('api', () => {
  let server

  beforeEach(() => {
    server = require('..')
  })

  afterEach(() => {
    server.close()
  })

  it('empty list using /expenses', (done) => {
    request(server)
      .get('/expenses')
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/(json|octet-stream)/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })

  it('adds an expenses using /expenses', (done) => {
    request(server)
      .post('/expenses')
      .send({ foo: 'bar' }) // there's no validation for now
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect('Location', /\/expenses\/\d+/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err)
        deepStrictEqual(res.body, { foo: 'bar', id: 0 })
        return done()
      })
  })

  it('list newly added expense using /expenses', (done) => {
    request(server)
      .get('/expenses')
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/(json|octet-stream)/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })

  it('responds to /index.html', (done) => {
    request(server)
      .get('/index.html')
      .expect(200, done)
  })

  it('responds to /bundle.js', (done) => {
    request(server)
      .get('/bundle.js')
      .expect(200, done)
  })

  it('responds to /style.css', (done) => {
    request(server)
      .get('/style.css')
      .expect(200, done)
  })

  it('responds to /sort-table.min.js', (done) => {
    request(server)
      .get('/sort-table.min.js')
      .expect(200, done)
  })

  it('responds 404 to missing routes like /foo/bar', (done) => {
    request(server)
      .get('/foo/bar')
      .expect(404, done)
  })
})
