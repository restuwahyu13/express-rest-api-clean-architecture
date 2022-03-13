import { StatusCodes as status } from 'http-status-codes'
import * as typeorm from 'typeorm'

import { ModelRoles } from '@models/model.roles'
import { Model } from '@di/di.roles'
import { DTORoles, DTORolesByID } from '@dto/dto.roles'
import { apiResponse, APIResponse } from '@helpers/helper.apiResponse'
import { Request } from '@helpers/helper.generic'

export class ServiceRoles extends Model {
  async createRolesService(req: Request<DTORoles>): Promise<APIResponse> {
    try {
      const checkRolesExist: ModelRoles = await super.model().roles.findOne({ name: req.body.name })
      if (checkRolesExist) throw apiResponse(status.BAD_REQUEST, `Role name ${req.body.name}, already exist`)

      const createNewRoles: typeorm.InsertResult = await super.model().roles.insert(req.body)
      if (!createNewRoles) throw apiResponse(status.FORBIDDEN, 'Create new role failed')

      return Promise.resolve(apiResponse(status.OK, 'Create new role success'))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_message || e.message))
    }
  }

  async resultsRolesService(req: Request): Promise<APIResponse> {
    try {
      const getAllRoles: ModelRoles[] = await super.model().roles.find({ withDeleted: false })

      return Promise.resolve(apiResponse(status.OK, 'Roles Is Ok', getAllRoles, null))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_message || e.message))
    }
  }

  async resultRolesService(req: Request<DTORolesByID>): Promise<APIResponse> {
    try {
      const getRolesId: ModelRoles = await super.model().roles.findOne({ where: { id: req.params.id, deleted_at: typeorm.IsNull() } })
      if (!getRolesId) throw apiResponse(status.NOT_FOUND, `Find roles for this id ${req.params.id}, is not exist`)

      return Promise.resolve(apiResponse(status.OK, 'Roles Is Ok', getRolesId, null))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_message || e.message))
    }
  }

  async deleteRolesService(req: Request<DTORolesByID>): Promise<APIResponse> {
    try {
      const checkRolesId: ModelRoles = await super.model().roles.findOne({ where: { id: req.params.id, deleted_at: typeorm.IsNull() } })
      if (!checkRolesId) throw apiResponse(status.NOT_FOUND, `Find roles for this id ${req.params.id}, is not exist`)

      const deleteRoles: typeorm.DeleteResult = await super.model().roles.delete(req.params.id)
      if (!deleteRoles.affected) throw apiResponse(status.FORBIDDEN, 'Deleted roles failed')

      return Promise.resolve(apiResponse(status.OK, 'Deleted roles success'))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_message || e.message))
    }
  }

  async updateRolesService(req: Request<DTORoles>): Promise<APIResponse> {
    try {
      const checkRolesId: ModelRoles = await super.model().roles.findOne({ where: { id: req.params.id, deleted_at: typeorm.IsNull() } })
      if (!checkRolesId) throw apiResponse(status.BAD_REQUEST, `Find roles for this id ${req.params.id}, is not exist`)

      const updateRoles: typeorm.UpdateResult = await super.model().roles.update(req.params.id, req.body)
      if (!updateRoles.affected) throw apiResponse(status.FORBIDDEN, 'Updated roles failed')

      return Promise.resolve(apiResponse(status.OK, 'Updated roles success'))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_message || e.message))
    }
  }
}
