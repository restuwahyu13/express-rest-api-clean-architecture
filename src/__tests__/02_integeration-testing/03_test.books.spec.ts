import 'mocha'
import faker from 'faker'
import { Express } from 'express'
import * as typeorm from 'typeorm'
import path from 'path'
import { ExpressTest } from '../../configs/config.testing'

let app: Express
let accessToken: string
let booksId: string
let imageFile: string

describe('Integation Testing - Books Teritory', function () {
  before(async function () {
    app = await ExpressTest.app()
    imageFile = path.join(__dirname, '../../../onepeace.png')
  })

  it('Should be login success for books', async function () {
    const res = await ExpressTest.superagent(app)
      .post('/api/v1/user/login')
      .set('Content-Type', 'application/json')
      .send({ email: 'johndoe13@gmail.com', password: 'qwerty12' })

    ExpressTest.expect(res.body.stat_code).to.be.equal(200)
    ExpressTest.expect(res.body.stat_message).to.be.equal('Login success')

    accessToken = res.body.data.accessToken
  })

  it('Should be create new books success', async function () {
    const res = await ExpressTest.superagent(app)
      .post('/api/v1/book')
      .set({ 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${accessToken}` })
      .field('name', faker.lorem.word(10))
      .field('isbn', String(Date.now()))
      .field('price', 12000)
      .field('description', 'Buku yang bercerita pemuda yang maju tak gentar untuk membela negaranya')
      .field('release_date', '2000-02-20')
      .field('pages', 100)
      .field('publisher', 'Gramedia')
      .field('language', 'Indonesia')
      .field('author_id', 1)
      .attach('images', imageFile)

    ExpressTest.expect(res.body.stat_code).to.be.equal(200)
    ExpressTest.expect(res.body.stat_message).to.be.equal('Create new books success')
  })

  it('Should be get all books success', async function () {
    const res = await ExpressTest.superagent(app)
      .get('/api/v1/book')
      .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })

    ExpressTest.expect(res.body.stat_code).to.be.equal(200)
    ExpressTest.expect(res.body.stat_message).to.be.equal('Books Is OK')

    booksId = res.body.data[0].id
  })

  it('Should be get books by id success', async function () {
    const res = await ExpressTest.superagent(app)
      .get(`/api/v1/book/${booksId}`)
      .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })

    ExpressTest.expect(res.body.stat_code).to.be.equal(200)
    ExpressTest.expect(res.body.stat_message).to.be.equal('Books Is Ok')
  })

  it('Should be update old books success', async function () {
    const res = await ExpressTest.superagent(app)
      .put(`/api/v1/book/${booksId}`)
      .set({ 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${accessToken}` })
      .field('name', faker.lorem.word(10))
      .field('isbn', String(Date.now()))
      .field('price', 12000)
      .field('description', 'Buku yang bercerita pemuda yang maju tak gentar untuk membela negaranya')
      .field('release_date', '2000-02-20')
      .field('pages', 100)
      .field('publisher', 'Gramedia')
      .field('language', 'Indonesia')
      .field('author_id', 1)
      .attach('images', imageFile)

    ExpressTest.expect(res.body.stat_code).to.be.equal(200)
    ExpressTest.expect(res.body.stat_message).to.be.equal('Updated books success')
  })

  it('Should be delete books by id success', async function () {
    const getBookId: Record<string, any>[] = await typeorm.createQueryBuilder('ModelBooks', 'books').orderBy('created_at', 'DESC').getMany()

    const res = await ExpressTest.superagent(app)
      .delete(`/api/v1/book/${getBookId[0].id}`)
      .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })

    ExpressTest.expect(res.body.stat_code).to.be.equal(200)
    ExpressTest.expect(res.body.stat_message).to.be.equal('Deleted books success')
  })
})
