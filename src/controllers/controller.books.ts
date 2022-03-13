import { OutgoingMessage } from 'http'

import { ServiceBooks } from '@services/service.books'
import { DTOBooks, DTOBooksByID } from '@dto/dto.books'
import { Request, Response } from '@helpers/helper.generic'
import { APIResponse } from '@helpers/helper.apiResponse'

export class ControllerBooks extends ServiceBooks {
  async createBooksController(req: Request<DTOBooks>, res: Response): Promise<OutgoingMessage> {
    try {
      const serviceResponse: APIResponse = await super.createBooksService(req)
      return res.status(serviceResponse.stat_code).json(serviceResponse)
    } catch (e: any) {
      return res.status(e.stat_code).json(e)
    }
  }

  async resultsBooksController(req: Request, res: Response): Promise<OutgoingMessage> {
    try {
      const serviceResponse: APIResponse = await super.resultsBooksService(req)
      return res.status(serviceResponse.stat_code).json(serviceResponse)
    } catch (e: any) {
      return res.status(e.stat_code).json(e)
    }
  }

  async resultBooksController(req: Request<DTOBooksByID>, res: Response): Promise<OutgoingMessage> {
    try {
      const serviceResponse: APIResponse = await super.resultBooksService(req)
      return res.status(serviceResponse.stat_code).json(serviceResponse)
    } catch (e: any) {
      return res.status(e.stat_code).json(e)
    }
  }

  async deleteBooksController(req: Request<DTOBooksByID>, res: Response): Promise<OutgoingMessage> {
    try {
      const serviceResponse: APIResponse = await super.deleteBooksService(req)
      return res.status(serviceResponse.stat_code).json(serviceResponse)
    } catch (e: any) {
      return res.status(e.stat_code).json(e)
    }
  }

  async updateBooksController(req: Request<DTOBooks>, res: Response): Promise<OutgoingMessage> {
    try {
      const serviceResponse: APIResponse = await super.updateBooksService(req)
      return res.status(serviceResponse.stat_code).json(serviceResponse)
    } catch (e: any) {
      return res.status(e.stat_code).json(e)
    }
  }
}
