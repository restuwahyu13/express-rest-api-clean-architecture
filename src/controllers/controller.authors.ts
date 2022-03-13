import { OutgoingMessage } from 'http'

import { ServiceAuthors } from '@services/service.authors'
import { DTOAuthors, DTOAuthorsById } from '@dto/dto.authors'
import { Request, Response } from '@helpers/helper.generic'
import { APIResponse } from '@helpers/helper.apiResponse'

export class ControllerAuthors extends ServiceAuthors {
  async createAuthorsController(req: Request<DTOAuthors>, res: Response): Promise<OutgoingMessage> {
    try {
      const serviceResponse: APIResponse = await super.createAuthorsService(req)
      return res.status(serviceResponse.stat_code).json(serviceResponse)
    } catch (e: any) {
      return res.status(e.stat_code).json(e)
    }
  }

  async resultsAuthorsController(req: Request, res: Response): Promise<OutgoingMessage> {
    try {
      const serviceResponse: APIResponse = await super.resultsAuthorsService(req)
      return res.status(serviceResponse.stat_code).json(serviceResponse)
    } catch (e: any) {
      return res.status(e.stat_code).json(e)
    }
  }

  async resultAuthorsController(req: Request<DTOAuthorsById>, res: Response): Promise<OutgoingMessage> {
    try {
      const serviceResponse: APIResponse = await super.resultAuthorsService(req)
      return res.status(serviceResponse.stat_code).json(serviceResponse)
    } catch (e: any) {
      return res.status(e.stat_code).json(e)
    }
  }

  async deleteAuthorsController(req: Request<DTOAuthorsById>, res: Response): Promise<OutgoingMessage> {
    try {
      const serviceResponse: APIResponse = await super.deleteAuthorsService(req)
      return res.status(serviceResponse.stat_code).json(serviceResponse)
    } catch (e: any) {
      return res.status(e.stat_code).json(e)
    }
  }

  async updateAuthorsController(req: Request<DTOAuthors>, res: Response): Promise<OutgoingMessage> {
    try {
      const serviceResponse: APIResponse = await super.updateAuthorsService(req)
      return res.status(serviceResponse.stat_code).json(serviceResponse)
    } catch (e: any) {
      return res.status(e.stat_code).json(e)
    }
  }
}
