import { OutgoingMessage } from 'http'
import { StatusCodes as status } from 'http-status-codes'
import { Request, Response, NextFunction, Handler } from 'express'
import { JwtPayload } from 'jsonwebtoken'

import { ModelRoles } from '@models/model.roles'
import { Model } from '@di/di.roles'
import { verifyToken } from '@libs/lib.jwt'
import { apiResponse } from '@helpers/helper.apiResponse'

export const permission = (roles: string[]): Handler => {
  return async function (req: Request, res: Response, next: NextFunction): Promise<OutgoingMessage> {
    try {
      const accessToken: string = (req.headers.authorization as string).split('Bearer ')[1]
      const decodedToken: string | JwtPayload = await verifyToken(accessToken)
      const repository: InstanceType<typeof Model> = new Model()

      const checkRoleAccess: ModelRoles = await repository.model().roles.findOne({ id: decodedToken['role_id'] })
      if (!roles.includes(checkRoleAccess.name)) throw apiResponse(status.UNAUTHORIZED, 'Your role is not allowed')

      next()
    } catch (e: any) {
      return res.status(e.stat_code | status.UNAUTHORIZED).json(e)
    }
  }
}
