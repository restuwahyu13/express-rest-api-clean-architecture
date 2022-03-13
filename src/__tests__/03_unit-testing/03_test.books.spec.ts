import 'mocha'
import faker from 'faker'
import { Request, Response } from 'express'
import { MockRequest, createRequest, MockResponse, createResponse } from 'node-mocks-http'
import path from 'path'

import { ExpressTest } from '../../configs/config.testing'
import { ControllerBooks } from '../../controllers/controller.books'
import { APIResponse } from '../../helpers/helper.apiResponse'

let booksController: InstanceType<typeof ControllerBooks>
let booksId: string
let imageFile: string

describe('Unit Testing - Books Teritory', function () {
  before(function () {
    booksController = new ControllerBooks() as InstanceType<typeof ControllerBooks>
    imageFile = path.join(__dirname, '../../../onepeace.png')
  })

  it('Should be create new books success', async function () {
    const req: MockRequest<Request> = createRequest()
    const res: MockResponse<Response> = createResponse()

    res.writeHead(200, { 'Content-Type': 'multipart/form-data' })

    req.body.name = faker.lorem.word(10)
    req.body.isbn = Date.now()
    req.body.price = 12000
    req.body.description = 'Buku yang bercerita pemuda yang maju tak gentar untuk membela negaranya'
    req.body.release_date = '2000-02-20'
    req.body.pages = 100
    req.body.publisher = 'Gramedia'
    req.body.language = 'Indonesia'
    req.body.author_id = 1
    req.files['images'] = imageFile

    await booksController.createBooksController(req, res)
    const apiResponse: APIResponse = res._getJSONData()

    ExpressTest.expect(res._isEndCalled()).to.be.true
    ExpressTest.expect(apiResponse.stat_code).to.be.equal(200)
    ExpressTest.expect(apiResponse.stat_message).to.be.equal('Create new books success')
  })

  it('Should be get all books success', async function () {
    const req: MockRequest<Request> = createRequest()
    const res: MockResponse<Response> = createResponse()

    await booksController.resultsBooksController(req, res)
    const apiResponse: APIResponse = res._getJSONData()

    ExpressTest.expect(res._isEndCalled()).to.be.true
    ExpressTest.expect(apiResponse.stat_code).to.be.equal(200)
    ExpressTest.expect(apiResponse.stat_message).to.be.equal('Books Is OK')

    booksId = apiResponse.data[0].id
  })

  it('Should be get books by id success', async function () {
    const req: MockRequest<Request> = createRequest()
    const res: MockResponse<Response> = createResponse()

    req.params.id = booksId

    await booksController.resultBooksController(req, res)
    const apiResponse: APIResponse = res._getJSONData()

    ExpressTest.expect(res._isEndCalled()).to.be.true
    ExpressTest.expect(apiResponse.stat_code).to.be.equal(200)
    ExpressTest.expect(apiResponse.stat_message).to.be.equal('Books Is Ok')
  })

  it('Should be update old books success', async function () {
    const req: MockRequest<Request> = createRequest()
    const res: MockResponse<Response> = createResponse()

    res.writeHead(200, { 'Content-Type': 'multipart/form-data' })

    req.params.id = booksId
    req.body.name = faker.lorem.word(10)
    req.body.isbn = Date.now()
    req.body.price = 12000
    req.body.description = 'Buku yang bercerita pemuda yang maju tak gentar untuk membela negaranya'
    req.body.release_date = '2000-02-20'
    req.body.pages = 100
    req.body.publisher = 'Gramedia'
    req.body.language = 'Indonesia'
    req.body.author_id = 1
    req.files['images'] = imageFile

    await booksController.updateBooksController(req, res)
    const apiResponse: APIResponse = res._getJSONData()

    ExpressTest.expect(res._isEndCalled()).to.be.true
    ExpressTest.expect(apiResponse.stat_code).to.be.equal(200)
    ExpressTest.expect(apiResponse.stat_message).to.be.equal('Updated books success')
  })

  it('Should be delete books by id success', async function () {
    const req: MockRequest<Request> = createRequest()
    const res: MockResponse<Response> = createResponse()

    req.params.id = booksId

    await booksController.deleteBooksController(req, res)
    const apiResponse: APIResponse = res._getJSONData()

    ExpressTest.expect(res._isEndCalled()).to.be.true
    ExpressTest.expect(apiResponse.stat_code).to.be.equal(200)
    ExpressTest.expect(apiResponse.stat_message).to.be.equal('Deleted books success')
  })
})
