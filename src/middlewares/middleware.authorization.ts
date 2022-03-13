import { StatusCodes as status } from 'http-status-codes'
import { Request, Response, NextFunction, Handler } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { OutgoingMessage } from 'http'

import { Model } from '@di/di.users'
import { ModelUsers } from '@models/model.users'
import { ModelSecret } from '@models/model.secret'
import { dateFormat } from '@helpers/helper.dateFormat'
import { apiResponse } from '@helpers/helper.apiResponse'
import { verifyToken } from '@libs/lib.jwt'

export const auth = (): Handler => {
  return async function (req: Request, res: Response, next: NextFunction): Promise<OutgoingMessage> {
    try {
      const accessToken: string = (req.headers.authorization as string).split('Bearer ')[1]
      const decodedToken: string | JwtPayload = await verifyToken(accessToken)
      const repository: InstanceType<typeof Model> = new Model()

      const checkAccessToken: ModelSecret = await repository
        .model()
        .secrets.findOne({ resource_by: decodedToken['id'], resource_type: 'login' }, { order: { created_at: 'DESC' } })
      if (!checkAccessToken) throw apiResponse(status.UNAUTHORIZED, 'Access Token invalid')

      const datenow: string = dateFormat(new Date())
      const expiredAt: string = dateFormat(checkAccessToken.expired_at)
      if (expiredAt < datenow) throw apiResponse(status.UNAUTHORIZED, 'Access Token expired')

      const getUsersData: ModelUsers = await repository
        .model()
        .users.findOne({ id: decodedToken['id'] }, { select: ['id', 'email', , 'role', 'created_at'], relations: ['role'] })

      // store users into session to redis, for global data request
      req.session['user'] = getUsersData
      next()
    } catch (e: any) {
      return res.status(e.start_code || status.UNAUTHORIZED).json(e)
    }
  }
}
