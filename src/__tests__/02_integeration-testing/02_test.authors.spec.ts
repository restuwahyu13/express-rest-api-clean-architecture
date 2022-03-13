import 'mocha'
import { Express } from 'express'
import faker from 'faker'
import * as typeorm from 'typeorm'
import { ExpressTest } from '../../configs/config.testing'

let app: Express
let accessToken: string
let authorsId: string

describe('Integation Testing - Authors Teritory', function () {
  before(async function () {
    app = await ExpressTest.app()
  })

  it('Should be login success for authors', async function () {
    const res = await ExpressTest.superagent(app)
      .post('/api/v1/user/login')
      .set('Content-Type', 'application/json')
      .send({ email: 'johndoe13@gmail.com', password: 'qwerty12' })

    ExpressTest.expect(res.body.stat_code).to.be.equal(200)
    ExpressTest.expect(res.body.stat_message).to.be.equal('Login success')

    accessToken = res.body.data.accessToken
  })

  it('Should be create new authors success', async function () {
    const res = await ExpressTest.superagent(app)
      .post('/api/v1/author')
      .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })
      .send({
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        place_of_birth: faker.address.country(),
        date_of_birth: faker.date.between('1970-01-01', new Date().toISOString())
      })

    ExpressTest.expect(res.body.stat_code).to.be.equal(200)
    ExpressTest.expect(res.body.stat_message).to.be.equal('Create new authors success')
  })

  it('Should be get all authors success', async function () {
    const res = await ExpressTest.superagent(app)
      .get('/api/v1/author')
      .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })

    ExpressTest.expect(res.body.stat_code).to.be.equal(200)
    ExpressTest.expect(res.body.stat_message).to.be.equal('Authors Is OK')

    authorsId = res.body.data[0].id
  })

  it('Should be get authors by id success', async function () {
    const res = await ExpressTest.superagent(app)
      .get(`/api/v1/author/${authorsId}`)
      .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })

    ExpressTest.expect(res.body.stat_code).to.be.equal(200)
    ExpressTest.expect(res.body.stat_message).to.be.equal('Authors Is Ok')
  })

  it('Should be update old authors success', async function () {
    const res = await ExpressTest.superagent(app)
      .put(`/api/v1/author/${authorsId}`)
      .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })
      .send({
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        place_of_birth: faker.address.country(),
        date_of_birth: faker.date.between('1970-01-01', new Date().toISOString())
      })

    ExpressTest.expect(res.body.stat_code).to.be.equal(200)
    ExpressTest.expect(res.body.stat_message).to.be.equal('Updated authors success')
  })

  it('Should be delete authors by id success', async function () {
    const getAuthorId: Record<string, any>[] = await typeorm
      .createQueryBuilder('ModelAuthors', 'authors')
      .orderBy('created_at', 'DESC')
      .getMany()

    const res = await ExpressTest.superagent(app)
      .delete(`/api/v1/author/${getAuthorId[0].id}`)
      .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })

    ExpressTest.expect(res.body.stat_code).to.be.equal(200)
    ExpressTest.expect(res.body.stat_message).to.be.equal('Deleted authors success')
  })
})
