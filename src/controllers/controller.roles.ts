import { OutgoingMessage } from 'http'

import { ServiceRoles } from '@services/service.roles'
import { DTORoles, DTORolesByID } from '@dto/dto.roles'
import { Request, Response } from '@helpers/helper.generic'
import { APIResponse } from '@helpers/helper.apiResponse'

export class ControllerRoles extends ServiceRoles {
  async createRolesController(req: Request<DTORoles>, res: Response): Promise<OutgoingMessage> {
    try {
      const serviceResponse: APIResponse = await super.createRolesService(req)
      return res.status(serviceResponse.stat_code).json(serviceResponse)
    } catch (e: any) {
      return res.status(e.stat_code).json(e)
    }
  }

  async resultsRolesController(req: Request, res: Response): Promise<OutgoingMessage> {
    try {
      const serviceResponse: APIResponse = await super.resultsRolesService(req)
      return res.status(serviceResponse.stat_code).json(serviceResponse)
    } catch (e: any) {
      return res.status(e.stat_code).json(e)
    }
  }

  async resultRolesController(req: Request<DTORolesByID>, res: Response): Promise<OutgoingMessage> {
    try {
      const serviceResponse: APIResponse = await super.resultRolesService(req)
      return res.status(serviceResponse.stat_code).json(serviceResponse)
    } catch (e: any) {
      return res.status(e.stat_code).json(e)
    }
  }

  async deleteRolesController(req: Request<DTORolesByID>, res: Response): Promise<OutgoingMessage> {
    try {
      const serviceResponse: APIResponse = await super.deleteRolesService(req)
      return res.status(serviceResponse.stat_code).json(serviceResponse)
    } catch (e: any) {
      return res.status(e.stat_code).json(e)
    }
  }

  async updateRolesController(req: Request<DTORoles>, res: Response): Promise<OutgoingMessage> {
    try {
      const serviceResponse: APIResponse = await super.updateRolesService(req)
      return res.status(serviceResponse.stat_code).json(serviceResponse)
    } catch (e: any) {
      return res.status(e.stat_code).json(e)
    }
  }
}
