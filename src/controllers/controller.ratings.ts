import { OutgoingMessage } from 'http'

import { ServiceRatings } from '@services/service.ratings'
import { DTORatings, DTORatingsByID } from '@dto/dto.ratings'
import { Request, Response } from '@helpers/helper.generic'
import { APIResponse } from '@helpers/helper.apiResponse'

export class ControllerRatings extends ServiceRatings {
  async createRatingsController(req: Request<DTORatings>, res: Response): Promise<OutgoingMessage> {
    try {
      const serviceResponse: APIResponse = await super.createRatingsService(req)
      return res.status(serviceResponse.stat_code).json(serviceResponse)
    } catch (e: any) {
      return res.status(e.stat_code).json(e)
    }
  }

  async resultsRatingsController(req: Request, res: Response): Promise<OutgoingMessage> {
    try {
      const serviceResponse: APIResponse = await super.resultsRatingsService(req)
      return res.status(serviceResponse.stat_code).json(serviceResponse)
    } catch (e: any) {
      return res.status(e.stat_code).json(e)
    }
  }

  async resultRatingsController(req: Request<DTORatingsByID>, res: Response): Promise<OutgoingMessage> {
    try {
      const serviceResponse: APIResponse = await super.resultRatingsService(req)
      return res.status(serviceResponse.stat_code).json(serviceResponse)
    } catch (e: any) {
      return res.status(e.stat_code).json(e)
    }
  }
}
