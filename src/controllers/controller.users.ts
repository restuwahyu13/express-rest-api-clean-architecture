import { OutgoingMessage } from 'http'

import { ServiceUsers } from '@services/service.users'
import { Request, Response } from '@helpers/helper.generic'
import { APIResponse } from '@helpers/helper.apiResponse'
import { DTORegister, DTOLogin } from '@dto/dto.users'

export class ControllerUsers extends ServiceUsers {
  async registerUsersController(req: Request<DTORegister>, res: Response): Promise<OutgoingMessage> {
    try {
      const serviceResponse: APIResponse = await super.registerUsersService(req)
      return res.status(serviceResponse.stat_code).json(serviceResponse)
    } catch (e: any) {
      return res.status(e.stat_code).json(e)
    }
  }

  async loginUsersController(req: Request<DTOLogin>, res: Response): Promise<OutgoingMessage> {
    try {
      const serviceResponse: APIResponse = await super.loginUsersService(req)
      return res.status(serviceResponse.stat_code).json(serviceResponse)
    } catch (e: any) {
      return res.status(e.stat_code).json(e)
    }
  }
}
