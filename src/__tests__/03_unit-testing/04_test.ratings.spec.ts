import 'mocha'
import { Request, Response } from 'express'
import { MockRequest, createRequest, MockResponse, createResponse } from 'node-mocks-http'

import { ExpressTest } from '../../configs/config.testing'
import { ControllerRatings } from '../../controllers/controller.ratings'
import { APIResponse } from '../../helpers/helper.apiResponse'

let ratingsController: InstanceType<typeof ControllerRatings>
let userId: number

describe('Ratings Testing Teritory', function () {
  before(async function () {
    ratingsController = new ControllerRatings() as InstanceType<typeof ControllerRatings>
    userId = 1
  })

  it('Should be create ratings for books success', async function () {
    const req: MockRequest<Request> = createRequest()
    const res: MockResponse<Response> = createResponse()

    req.body.rating = '5'
    req.body.noted = 'mantap jiwa bukunya'
    req.body.book_id = 3
    req.body.user_id = userId

    await ratingsController.createRatingsController(req, res)
    const apiResponse: APIResponse = res._getJSONData()

    ExpressTest.expect(res._isEndCalled()).to.be.true
    ExpressTest.expect(apiResponse.stat_code).to.be.equal(200)
    ExpressTest.expect(apiResponse.stat_message).to.be.equal('Create new ratings success')
  })

  it('Should be get all ratings success', async function () {
    const req: MockRequest<Request> = createRequest()
    const res: MockResponse<Response> = createResponse()

    await ratingsController.resultsRatingsController(req, res)
    const apiResponse: APIResponse = res._getJSONData()

    ExpressTest.expect(res._isEndCalled()).to.be.true
    ExpressTest.expect(apiResponse.stat_code).to.be.equal(200)
    ExpressTest.expect(apiResponse.stat_message).to.be.equal('Ratings Is OK')
  })

  it('Should be get ratings by user_id success', async function () {
    const req: MockRequest<Request> = createRequest()
    const res: MockResponse<Response> = createResponse()

    req.params.user_id = String(userId)

    await ratingsController.resultRatingsController(req, res)
    const apiResponse: APIResponse = res._getJSONData()

    ExpressTest.expect(res._isEndCalled()).to.be.true
    ExpressTest.expect(apiResponse.stat_code).to.be.equal(200)
    ExpressTest.expect(apiResponse.stat_message).to.be.equal('Ratings Is Ok')
  })
})
