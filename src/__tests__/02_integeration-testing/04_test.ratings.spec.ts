import 'mocha'
import { Express } from 'express'
import { ExpressTest } from '../../configs/config.testing'

let app: Express
let accessToken: string
let userId: string

describe('Integation Testing - Ratings Teritory', function () {
  before(async function () {
    app = await ExpressTest.app()
  })

  it('Should be login success for ratings', async function () {
    const res = await ExpressTest.superagent(app)
      .post('/api/v1/user/login')
      .set('Content-Type', 'application/json')
      .send({ email: 'johndoe13@gmail.com', password: 'qwerty12' })

    ExpressTest.expect(res.body.stat_code).to.be.equal(200)
    ExpressTest.expect(res.body.stat_message).to.be.equal('Login success')

    accessToken = res.body.data.accessToken
  })

  it('Should be create ratings for books success', async function () {
    const res = await ExpressTest.superagent(app)
      .post('/api/v1/rating')
      .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })
      .send({
        rating: '5',
        noted: 'mantap jiwa bukunya',
        book_id: 1
      })

    ExpressTest.expect(res.body.stat_code).to.be.equal(200)
    ExpressTest.expect(res.body.stat_message).to.be.equal('Create new ratings success')
  })

  it('Should be get all ratings success', async function () {
    const res = await ExpressTest.superagent(app)
      .get('/api/v1/rating')
      .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })

    ExpressTest.expect(res.body.stat_code).to.be.equal(200)
    ExpressTest.expect(res.body.stat_message).to.be.equal('Ratings Is OK')

    userId = res.body.data[0].user.id
  })

  it('Should be get ratings by user_id success', async function () {
    const res = await ExpressTest.superagent(app)
      .get(`/api/v1/rating/${userId}`)
      .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })

    ExpressTest.expect(res.body.stat_code).to.be.equal(200)
    ExpressTest.expect(res.body.stat_message).to.be.equal('Ratings Is Ok')
  })
})
