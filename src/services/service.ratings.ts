import { StatusCodes as status } from 'http-status-codes'
import * as typeorm from 'typeorm'

import { Model } from '@di/di.ratings'
import { ModelRatings } from '@models/model.ratings'
import { DTORatings, DTORatingsByID } from '@dto/dto.ratings'
import { Request } from '@helpers/helper.generic'
import { apiResponse, APIResponse } from '@helpers/helper.apiResponse'
import { pagination, Pagination } from '@helpers/helper.pagination'
import { filterParser } from '@/helpers/helper.filterParser'

export class ServiceRatings extends Model {
  async createRatingsService(req: Request<DTORatings>): Promise<APIResponse> {
    try {
      // overwrite value for user_id
      req.body.user_id = req.body.user_id || req.session['user']['id']

      const checkBookRating: ModelRatings = await super
        .model()
        .ratings.findOne({ book: { id: req.body.book_id }, user: { id: req.body.user_id } })
      if (checkBookRating) throw apiResponse(status.BAD_REQUEST, 'You are already give rating for this books')

      const createNewRating: typeorm.InsertResult = await super.model().ratings.insert({
        rating: req.body.rating,
        noted: req.body.noted,
        book: { id: req.body.book_id },
        user: { id: req.body.user_id }
      })
      if (!createNewRating) throw apiResponse(status.FORBIDDEN, 'Create new ratings failed')

      return Promise.resolve(apiResponse(status.OK, 'Create new ratings success'))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_message || e.message))
    }
  }

  async resultsRatingsService(req: Request): Promise<APIResponse> {
    try {
      let findOptions: typeorm.FindManyOptions<ModelRatings>
      const typeormPagination: Pagination<Record<string, any>> | Record<string, any> = pagination(req.query as any)

      if (typeormPagination.hasOwnProperty('filter')) {
        findOptions = {
          where: filterParser(typeormPagination.filter)
        }
      }

      const getAllRatings: ModelRatings[] = await super.model().ratings.find({
        relations: ['book', 'user'],
        order: { created_at: typeormPagination.sort },
        take: typeormPagination.limit,
        skip: typeormPagination.offset,
        withDeleted: false,
        ...findOptions
      })

      return Promise.resolve(apiResponse(status.OK, 'Ratings Is OK', getAllRatings, null))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_message || e.message))
    }
  }

  async resultRatingsService(req: Request<DTORatingsByID>): Promise<APIResponse> {
    try {
      const getRatingByUsers: ModelRatings = await super
        .model()
        .ratings.findOne({ where: { user: { id: req.params.user_id } }, relations: ['book', 'user'] })
      if (!getRatingByUsers) throw apiResponse(status.NOT_FOUND, `Find ratings for this user ${req.params.user_id}, is not exist`)

      return Promise.resolve(apiResponse(status.OK, 'Ratings Is Ok', getRatingByUsers, null))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_message || e.message))
    }
  }
}
