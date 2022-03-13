import 'mocha'
import { Request, Response } from 'express'
import faker from 'faker'
import { createRequest, createResponse, MockRequest, MockResponse } from 'node-mocks-http'

import { ExpressTest } from '../../configs/config.testing'
import { ControllerUsers } from '../../controllers/controller.users'
import { APIResponse } from '../../helpers/helper.apiResponse'

let usersController: InstanceType<typeof ControllerUsers>

describe('Unit testing - Users Teritory', function () {
  before(function () {
    usersController = new ControllerUsers() as InstanceType<typeof ControllerUsers>
  })

  it('Should be incorect password', async function () {
    const req: MockRequest<Request> = createRequest()
    const res: MockResponse<Response> = createResponse()

    req.body.email = 'johndoe13@gmail.com'
    req.body.password = 'anabel12'

    await usersController.loginUsersController(req, res)
    const apiResponse: APIResponse = res._getJSONData()

    ExpressTest.expect(res._isEndCalled()).to.be.true
    ExpressTest.expect(apiResponse.stat_code).to.be.equal(400)
    ExpressTest.expect(apiResponse.stat_message).to.be.equal('Incorect email or password')
  })

  it('Should be login success', async function () {
    const req: MockRequest<Request> = createRequest()
    const res: MockResponse<Response> = createResponse()

    req.body.email = 'johndoe13@gmail.com'
    req.body.password = 'qwerty12'

    await usersController.loginUsersController(req, res)
    const apiResponse: APIResponse = res._getJSONData()

    ExpressTest.expect(res._isEndCalled()).to.be.true
    ExpressTest.expect(apiResponse.stat_code).to.be.equal(200)
    ExpressTest.expect(apiResponse.stat_message).to.be.equal('Login success')
  })

  it('Should be register email already taken', async function () {
    const req: MockRequest<Request> = createRequest()
    const res: MockResponse<Response> = createResponse()

    req.body.email = 'johndoe13@gmail.com'
    req.body.password = 'qwerty12'

    await usersController.registerUsersController(req, res)
    const apiResponse: APIResponse = res._getJSONData()

    ExpressTest.expect(res._isEndCalled()).to.be.true
    ExpressTest.expect(apiResponse.stat_code).to.be.equal(400)
    ExpressTest.expect(apiResponse.stat_message).to.be.equal(`Email ${req.body.email} already taken`)
  })

  it('Should be register success', async function () {
    const req: MockRequest<Request> = createRequest()
    const res: MockResponse<Response> = createResponse()

    req.body.email = faker.internet.email()
    req.body.password = 'qwerty12'

    await usersController.registerUsersController(req, res)
    const apiResponse: APIResponse = res._getJSONData()

    ExpressTest.expect(res._isEndCalled()).to.be.true
    ExpressTest.expect(apiResponse.stat_code).to.be.equal(200)
    ExpressTest.expect(apiResponse.stat_message).to.be.equal('Create new account success')
  })
})
