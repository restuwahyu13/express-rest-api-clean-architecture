import { StatusCodes as status } from 'http-status-codes'
import * as typeorm from 'typeorm'

import { Model } from '@di/di.authors'
import { ModelAuthors } from '@models/model.authors'
import { DTOAuthors, DTOAuthorsById } from '@dto/dto.authors'
import { Request } from '@helpers/helper.generic'
import { apiResponse, APIResponse } from '@helpers/helper.apiResponse'
import { pagination, Pagination } from '@helpers/helper.pagination'
import { filterParser } from '@helpers/helper.filterParser'

export class ServiceAuthors extends Model {
  async createAuthorsService(req: Request<DTOAuthors>): Promise<APIResponse> {
    try {
      const checkAuthorsExist: ModelAuthors = await super.model().authors.findOne({ firstname: req.body.firstname, lastname: req.body.lastname })
      if (checkAuthorsExist) throw apiResponse(status.NOT_FOUND, `Authors name ${req.body.firstname} ${req.body.lastname}, already exist`)

      const createNewAuthors: typeorm.InsertResult = await super.model().authors.insert(req.body)
      if (!createNewAuthors) throw apiResponse(status.FORBIDDEN, 'Create new authors failed')

      return Promise.resolve(apiResponse(status.OK, 'Create new authors success'))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_message || e.message))
    }
  }

  async resultsAuthorsService(req: Request): Promise<APIResponse> {
    try {
      let findOptions: typeorm.FindManyOptions<ModelAuthors>
      const typeormPagination: Pagination<Record<string, any>> | Record<string, any> = pagination(req.query as any)

      if (typeormPagination.hasOwnProperty('filter')) {
        findOptions = {
          where: filterParser(typeormPagination.filter)
        }
      }

      const getAllAuthors: ModelAuthors[] = await super.model().authors.find({
        relations: ['books'],
        order: { created_at: typeormPagination.sort },
        take: typeormPagination.limit,
        skip: typeormPagination.offset,
        withDeleted: false,
        ...findOptions
      })

      return Promise.resolve(apiResponse(status.OK, 'Authors Is OK', getAllAuthors, typeormPagination))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_message || e.message))
    }
  }

  async resultAuthorsService(req: Request<DTOAuthorsById>): Promise<any> {
    try {
      const getAuthorsId: ModelAuthors = await super
        .model()
        .authors.findOne({ where: { id: req.params.id, deleted_at: typeorm.IsNull() }, relations: ['books'] })
      if (!getAuthorsId) throw apiResponse(status.NOT_FOUND, `Find authors for this id ${req.params.id}, is not exist`)

      return Promise.resolve(apiResponse(status.OK, 'Authors Is Ok', getAuthorsId, null))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_message || e.message))
    }
  }

  async deleteAuthorsService(req: Request<DTOAuthorsById>): Promise<APIResponse> {
    try {
      const checkAuthorsId: ModelAuthors = await super.model().authors.findOne({ where: { id: req.params.id, deleted_at: typeorm.IsNull() } })
      if (!checkAuthorsId) throw apiResponse(status.NOT_FOUND, `Find authors for this id ${req.params.id}, is not exist`)

      const deleteAuthors: typeorm.UpdateResult = await super.model().authors.softDelete(req.params.id)
      if (!deleteAuthors.affected) throw apiResponse(status.FORBIDDEN, 'Deleted authors failed')

      return Promise.resolve(apiResponse(status.OK, 'Deleted authors success'))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_message || e.message))
    }
  }

  async updateAuthorsService(req: Request<DTOAuthors>): Promise<APIResponse> {
    try {
      const checkAuthorsId: ModelAuthors = await super.model().authors.findOne({ where: { id: req.params.id, deleted_at: typeorm.IsNull() } })
      if (!checkAuthorsId) throw apiResponse(status.NOT_FOUND, `Find authors for this id ${req.params.id}, is not exist`)

      const updateAuthors: typeorm.UpdateResult = await super.model().authors.update(req.params.id, req.body)
      if (!updateAuthors.affected) throw apiResponse(status.FORBIDDEN, 'Updated authors failed')

      return Promise.resolve(apiResponse(status.OK, 'Updated authors success'))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_message || e.message))
    }
  }
}
