import { StatusCodes as status } from 'http-status-codes'
import { Request, Response, NextFunction, Handler } from 'express'
import { IncomingHttpHeaders, OutgoingMessage } from 'http'
import { assert } from 'is-any-type'
import { decrypt } from 'jwt-transform'

import { apiResponse } from '@helpers/helper.apiResponse'

export const transform = (): Handler => {
  return async function (req: Request, res: Response, next: NextFunction): Promise<OutgoingMessage> {
    try {
      let headers: IncomingHttpHeaders = req.headers
      if (!Object.keys(headers).includes('authorization')) throw apiResponse(status.UNAUTHORIZED, 'Authorization is required')

      const authorization: boolean | undefined = (headers.authorization as string).includes('Bearer')
      if (!authorization) throw apiResponse(status.UNAUTHORIZED, 'Bearer is required')

      const accessToken: string = (headers.authorization as string).split('Bearer ')[1]
      if (assert.isUndefined(accessToken as any)) throw apiResponse(status.UNAUTHORIZED, 'Access Token is required')

      const validJwt: string[] = (accessToken as string).split('.')
      if (validJwt?.length !== 3) throw apiResponse(status.UNAUTHORIZED, 'Access Token format is not valid')

      // overwrite authorization headers
      req.headers.authorization = `Bearer ${await decrypt(accessToken, 20)}`

      next()
    } catch (e: any) {
      return res.status(e.stat_code || status.UNAUTHORIZED).json(e)
    }
  }
}
