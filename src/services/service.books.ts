import { Express } from 'express'
import { StatusCodes as status } from 'http-status-codes'
import * as typeorm from 'typeorm'
import fs from 'fs'

import { Model } from '@di/di.books'
import { ModelBooks } from '@models/model.books'
import { DTOBooks, DTOBooksByID } from '@dto/dto.books'
import { Request } from '@helpers/helper.generic'
import { apiResponse, APIResponse } from '@helpers/helper.apiResponse'
import { cloudinaryStorage, UploadApiResponse } from '@libs/lib.cloudinary'
import { Pagination, pagination } from '@helpers/helper.pagination'
import { filterParser } from '@helpers/helper.filterParser'

export class ServiceBooks extends Model {
  async createBooksService(req: Request<DTOBooks>): Promise<any> {
    try {
      const checkIsbn: ModelBooks = await super.model().books.findOne({ where: { isbn: req.body.isbn, deleted_at: typeorm.IsNull() } })
      if (checkIsbn) throw apiResponse(status.CONFLICT, `Book already exist for this isbn ${req.body.isbn}`)

      let directory: string = ''
      let bookImages: string[] = []
      let files: Express.Multer.File[] = req.files as Express.Multer.File[]

      for (let i in files) {
        if (process.platform !== 'win32') directory = `/tmp/${files[i].filename}`
        else directory = `${process.env.TEMP}/${files[i].filename}`

        if (fs.existsSync(directory)) {
          const res: UploadApiResponse = await cloudinaryStorage(directory)
          bookImages.push(res.secure_url)
        }
      }

      const createNewBooks: typeorm.InsertResult = await super.model().books.insert({
        name: req.body.name,
        isbn: req.body.isbn,
        description: req.body.description,
        release_date: req.body.release_date,
        pages: req.body.pages,
        publisher: req.body.publisher,
        language: req.body.language,
        price: req.body.price,
        author: { id: req.body.author_id },
        images: bookImages
      })
      if (!createNewBooks) throw apiResponse(status.FORBIDDEN, 'Create new books failed')

      return Promise.resolve(apiResponse(status.OK, 'Create new books success'))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_message || e.message))
    }
  }

  async resultsBooksService(req: Request): Promise<APIResponse> {
    try {
      let findOptions: typeorm.FindManyOptions<ModelBooks>
      const typeormPagination: Pagination<Record<string, any>> | Record<string, any> = pagination(req.query as any)

      if (typeormPagination.hasOwnProperty('filter')) {
        findOptions = {
          where: filterParser(typeormPagination.filter)
        }
      }

      const getAllBooks: ModelBooks[] = await super.model().books.find({
        relations: ['author'],
        order: { created_at: typeormPagination.sort },
        take: typeormPagination.limit,
        skip: typeormPagination.offset,
        withDeleted: false,
        ...findOptions
      })

      return Promise.resolve(apiResponse(status.OK, 'Books Is OK', getAllBooks, null))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_message || e.message))
    }
  }

  async resultBooksService(req: Request<DTOBooksByID>): Promise<APIResponse> {
    try {
      const getBookId: ModelBooks = await super
        .model()
        .books.findOne({ where: { id: req.params.id, deleted_at: typeorm.IsNull() }, relations: ['author'] })
      if (!getBookId) throw apiResponse(status.NOT_FOUND, `Find books for this id ${req.params.id}, is not exist`)

      return Promise.resolve(apiResponse(status.OK, 'Books Is Ok', getBookId, null))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_message || e.message))
    }
  }

  async deleteBooksService(req: Request<DTOBooksByID>): Promise<APIResponse> {
    try {
      const checkBookId: ModelBooks = await super.model().books.findOne({ where: { id: req.params.id, deleted_at: typeorm.IsNull() } })
      if (!checkBookId) throw apiResponse(status.NOT_FOUND, `Find books for this id ${req.params.id}, is not exist`)

      const deleteBook: typeorm.UpdateResult = await super.model().books.softDelete(req.params.id)
      if (!deleteBook.affected) throw apiResponse(status.FORBIDDEN, 'Deleted books failed')

      return Promise.resolve(apiResponse(status.OK, 'Deleted books success'))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_message || e.message))
    }
  }

  async updateBooksService(req: Request<DTOBooks>): Promise<APIResponse> {
    try {
      const checkBookId: ModelBooks = await super.model().books.findOne({ where: { id: req.params.id, deleted_at: typeorm.IsNull() } })
      if (!checkBookId) throw apiResponse(status.NOT_FOUND, `Find books for this id ${req.params.id}, is not exist`)

      let directory: string = ''
      let bookImages: string[] = []
      let files: Express.Multer.File[] = req.files as Express.Multer.File[]

      for (let i in files) {
        if (process.platform !== 'win32') directory = `/tmp/${files[i].filename}`
        else directory = `${process.env.TEMP}/${files[i].filename}`

        if (fs.existsSync(directory)) {
          const res: UploadApiResponse = await cloudinaryStorage(directory)
          bookImages.push(res.secure_url)
        }
      }

      const updateBook: typeorm.UpdateResult = await super.model().books.update(req.params.id, {
        name: req.body.name,
        isbn: req.body.isbn,
        description: req.body.description,
        release_date: req.body.release_date,
        pages: req.body.pages,
        publisher: req.body.publisher,
        language: req.body.language,
        price: req.body.price,
        author: { id: req.body.author_id },
        images: bookImages
      })
      if (!updateBook.affected) throw apiResponse(status.FORBIDDEN, 'Updated books failed')

      return Promise.resolve(apiResponse(status.OK, 'Updated books success'))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_message || e.message))
    }
  }
}
