import 'mocha'
import { Request, Response } from 'express'
import faker from 'faker'
import { MockRequest, MockResponse, createRequest, createResponse } from 'node-mocks-http'

import { ExpressTest } from '../../configs/config.testing'
import { ControllerAuthors } from '../../controllers/controller.authors'
import { APIResponse } from '../../helpers/helper.apiResponse'

let authorsController: InstanceType<typeof ControllerAuthors>
let authorsId: string

describe('Unit Testing - Authors Teritory', function () {
  before(function () {
    authorsController = new ControllerAuthors() as InstanceType<typeof ControllerAuthors>
  })

  it('Should be create new authors success', async function () {
    const req: MockRequest<Request> = createRequest()
    const res: MockResponse<Response> = createResponse()

    req.body.firstname = faker.name.firstName()
    req.body.lastname = faker.name.lastName()
    req.body.place_of_birth = faker.address.country()
    req.body.date_of_birth = faker.date.between('1970-01-01', new Date().toISOString())

    await authorsController.createAuthorsController(req, res)
    const apiResponse: APIResponse = res._getJSONData()

    ExpressTest.expect(res._isEndCalled()).to.be.true
    ExpressTest.expect(apiResponse.stat_code).to.be.equal(200)
    ExpressTest.expect(apiResponse.stat_message).to.be.equal('Create new authors success')
  })

  it('Should be get all authors success', async function () {
    const req: MockRequest<Request> = createRequest()
    const res: MockResponse<Response> = createResponse()

    await authorsController.resultsAuthorsController(req, res)
    const apiResponse: APIResponse = res._getJSONData()

    ExpressTest.expect(res._isEndCalled()).to.be.true
    ExpressTest.expect(apiResponse.stat_code).to.be.equal(200)
    ExpressTest.expect(apiResponse.stat_message).to.be.equal('Authors Is OK')

    authorsId = apiResponse.data[0].id
  })

  it('Should be get authors by id success', async function () {
    const req: MockRequest<Request> = createRequest()
    const res: MockResponse<Response> = createResponse()

    req.params.id = authorsId

    await authorsController.resultAuthorsController(req, res)
    const apiResponse: APIResponse = res._getJSONData()

    ExpressTest.expect(res._isEndCalled()).to.be.true
    ExpressTest.expect(apiResponse.stat_code).to.be.equal(200)
    ExpressTest.expect(apiResponse.stat_message).to.be.equal('Authors Is Ok')
  })

  it('Should be update old authors success', async function () {
    const req: MockRequest<Request> = createRequest()
    const res: MockResponse<Response> = createResponse()

    req.params.id = authorsId
    req.body.firstname = faker.name.firstName()
    req.body.lastname = faker.name.lastName()
    req.body.place_of_birth = faker.address.country()
    req.body.date_of_birth = faker.date.between('1970-01-01', new Date().toISOString())

    await authorsController.updateAuthorsController(req, res)
    const apiResponse: APIResponse = res._getJSONData()

    ExpressTest.expect(res._isEndCalled()).to.be.true
    ExpressTest.expect(apiResponse.stat_code).to.be.equal(200)
    ExpressTest.expect(apiResponse.stat_message).to.be.equal('Updated authors success')
  })

  it('Should be delete authors by id success', async function () {
    const req: MockRequest<Request> = createRequest()
    const res: MockResponse<Response> = createResponse()

    req.params.id = authorsId

    await authorsController.deleteAuthorsController(req, res)
    const apiResponse: APIResponse = res._getJSONData()

    ExpressTest.expect(apiResponse.stat_code).to.be.equal(200)
    ExpressTest.expect(apiResponse.stat_message).to.be.equal('Deleted authors success')
  })
})
