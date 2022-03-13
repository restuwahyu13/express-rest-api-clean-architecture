import 'mocha'
import { Express } from 'express'
import faker from 'faker'
import { ExpressTest } from '../../configs/config.testing'

let app: Express

describe('Integration Testing - Users Teritory', function () {
  before(async function () {
    app = await ExpressTest.app()
  })

  it('Should be login incorect password', async function () {
    const res = await ExpressTest.superagent(app)
      .post('/api/v1/user/login')
      .set('Content-Type', 'application/json')
      .send({ email: 'johndoe13@gmail.com', password: 'anabel12' })

    ExpressTest.expect(res.body.stat_code).to.be.equal(400)
    ExpressTest.expect(res.body.stat_message).to.be.equal('Incorect email or password')
  })

  it('Should be login success', async function () {
    const res = await ExpressTest.superagent(app)
      .post('/api/v1/user/login')
      .set('Content-Type', 'application/json')
      .send({ email: 'johndoe13@gmail.com', password: 'qwerty12' })

    ExpressTest.expect(res.body.stat_code).to.be.equal(200)
    ExpressTest.expect(res.body.stat_message).to.be.equal('Login success')
  })

  it('Should be register email already taken', async function () {
    const res = await ExpressTest.superagent(app)
      .post('/api/v1/user/register')
      .set('Content-Type', 'application/json')
      .send({ email: 'johndoe13@gmail.com', password: 'qwerty12' })

    ExpressTest.expect(res.body.stat_code).to.be.equal(400)
    ExpressTest.expect(res.body.stat_message).to.be.equal(`Email johndoe13@gmail.com already taken`)
  })

  it('Should be register success', async function () {
    const res = await ExpressTest.superagent(app)
      .post('/api/v1/user/register')
      .set('Content-Type', 'application/json')
      .send({ email: faker.internet.email(), password: 'qwerty12' })

    ExpressTest.expect(res.body.stat_code).to.be.equal(200)
    ExpressTest.expect(res.body.stat_message).to.be.equal('Create new account success')
  })
})
