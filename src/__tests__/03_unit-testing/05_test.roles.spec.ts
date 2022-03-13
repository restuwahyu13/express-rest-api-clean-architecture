import 'mocha'
import { Request, Response } from 'express'
import { MockRequest, MockResponse, createRequest, createResponse } from 'node-mocks-http'

import { ExpressTest } from '../../configs/config.testing'
import { ControllerRoles } from '../../controllers/controller.roles'
import { APIResponse } from '../../helpers/helper.apiResponse'

let rolesController: InstanceType<typeof ControllerRoles>
let rolesId: string

describe('Roles Testing Teritory', function () {
  before(async function () {
    rolesController = new ControllerRoles() as InstanceType<typeof ControllerRoles>
  })

  it('Should be create roles for user success', async function () {
    const req: MockRequest<Request> = createRequest()
    const res: MockResponse<Response> = createResponse()

    req.body.name = 'sales'

    await rolesController.createRolesController(req, res)
    const apiResponse: APIResponse = res._getJSONData()

    ExpressTest.expect(res._isEndCalled()).to.be.true
    ExpressTest.expect(apiResponse.stat_code).to.be.equal(200)
    ExpressTest.expect(apiResponse.stat_message).to.be.equal('Create new role success')
  })

  it('Should be get all roles success', async function () {
    const req: MockRequest<Request> = createRequest()
    const res: MockResponse<Response> = createResponse()

    await rolesController.resultsRolesController(req, res)
    const apiResponse: APIResponse = res._getJSONData()

    ExpressTest.expect(apiResponse.stat_code).to.be.equal(200)
    ExpressTest.expect(apiResponse.stat_message).to.be.equal('Roles Is Ok')

    rolesId = apiResponse.data[0].id
  })

  it('Should be get roles by id success', async function () {
    const req: MockRequest<Request> = createRequest()
    const res: MockResponse<Response> = createResponse()

    req.params.id = rolesId

    await rolesController.resultRolesController(req, res)
    const apiResponse: APIResponse = res._getJSONData()

    ExpressTest.expect(apiResponse.stat_code).to.be.equal(200)
    ExpressTest.expect(apiResponse.stat_message).to.be.equal('Roles Is Ok')
  })

  it('Should be update roles for user success', async function () {
    const req: MockRequest<Request> = createRequest()
    const res: MockResponse<Response> = createResponse()

    req.params.id = rolesId
    req.body.name = 'admin'

    await rolesController.updateRolesController(req, res)
    const apiResponse: APIResponse = res._getJSONData()

    ExpressTest.expect(res._isEndCalled()).to.be.true
    ExpressTest.expect(apiResponse.stat_code).to.be.equal(200)
    ExpressTest.expect(apiResponse.stat_message).to.be.equal('Updated roles success')
  })
})
