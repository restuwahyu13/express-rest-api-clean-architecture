import 'mocha'
import { Express } from 'express'
import { ExpressTest } from '../../configs/config.testing'

let app: Express
let accessToken: string
let rolesId: string

describe('Integation Testing - Roles Teritory', function () {
  before(async function () {
    app = await ExpressTest.app()
  })

  it('Should be login success for roles', async function () {
    const res = await ExpressTest.superagent(app)
      .post('/api/v1/user/login')
      .set('Content-Type', 'application/json')
      .send({ email: 'johndoe13@gmail.com', password: 'qwerty12' })

    ExpressTest.expect(res.body.stat_code).to.be.equal(200)
    ExpressTest.expect(res.body.stat_message).to.be.equal('Login success')

    accessToken = res.body.data.accessToken
  })

  it('Should be create roles for user success', async function () {
    const res = await ExpressTest.superagent(app)
      .post('/api/v1/role')
      .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })
      .send({ name: 'staff' })

    ExpressTest.expect(res.body.stat_code).to.be.equal(200)
    ExpressTest.expect(res.body.stat_message).to.be.equal('Create new role success')
  })

  it('Should be get all roles success', async function () {
    const res = await ExpressTest.superagent(app)
      .get('/api/v1/role')
      .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })

    ExpressTest.expect(res.body.stat_code).to.be.equal(200)
    ExpressTest.expect(res.body.stat_message).to.be.equal('Roles Is Ok')

    rolesId = res.body.data[0].id
  })

  it('Should be get roles by id success', async function () {
    const res = await ExpressTest.superagent(app)
      .get(`/api/v1/role/${rolesId}`)
      .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })

    ExpressTest.expect(res.body.stat_code).to.be.equal(200)
    ExpressTest.expect(res.body.stat_message).to.be.equal('Roles Is Ok')
  })

  it('Should be update roles for user success', async function () {
    const res = await ExpressTest.superagent(app)
      .put(`/api/v1/role/${rolesId}`)
      .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })
      .send({ name: 'manager' })

    ExpressTest.expect(res.body.stat_code).to.be.equal(200)
    ExpressTest.expect(res.body.stat_message).to.be.equal('Updated roles success')
  })
})
