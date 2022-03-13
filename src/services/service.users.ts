import { StatusCodes as status } from 'http-status-codes'
import { InsertResult } from 'typeorm'

import { Model } from '@di/di.users'
import { ModelUsers } from '@models/model.users'
import { DTOLogin, DTORegister } from '@dto/dto.users'
import { apiResponse } from '@helpers/helper.apiResponse'
import { Request } from '@helpers/helper.generic'
import { expiredAt } from '@helpers/helper.expiredAt'
import { comparePassword, IPassword } from '@libs/lib.bcrypt'
import { IToken, signToken } from '@libs/lib.jwt'

export class ServiceUsers extends Model {
  async registerUsersService(req: Request<DTORegister>): Promise<any> {
    try {
      const checkUserEmail: ModelUsers = await super.model().users.findOne({ email: req.body.email })
      if (checkUserEmail) throw apiResponse(status.BAD_REQUEST, `Email ${req.body.email} already taken`)

      const users: InstanceType<typeof ModelUsers> = new ModelUsers()
      users.email = req.body.email
      users.password = req.body.password

      const createNewUser: ModelUsers = await super.model().users.save(users)
      if (!createNewUser) throw apiResponse(status.FORBIDDEN, 'Create new account failed')

      return Promise.resolve(apiResponse(status.OK, 'Create new account success'))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_message || e.message))
    }
  }

  async loginUsersService(req: Request<DTOLogin>): Promise<any> {
    try {
      const checkUserEmail: ModelUsers = await super.model().users.findOne({ email: req.body.email }, { relations: ['role'] })
      if (!checkUserEmail) throw apiResponse(status.BAD_REQUEST, `Email ${req.body.email} is not never registered`)

      const checkPassword: IPassword = await comparePassword(req.body.password, checkUserEmail.password)
      if (!checkPassword.success) throw apiResponse(status.BAD_REQUEST, 'Incorect email or password')

      const payloadToken: Record<string, any> = { id: checkUserEmail.id, email: checkUserEmail.email, role_id: checkUserEmail.role.id }
      const token: IToken = await signToken(payloadToken, { expiredAt: 1, type: 'days' })

      const storeAccessToken: InsertResult = await super.model().secrets.insert({
        resource_by: checkUserEmail.id,
        resource_type: 'login',
        access_token: token.accessToken,
        expired_at: expiredAt(1, 'days')
      })
      if (!storeAccessToken) throw apiResponse(status.FORBIDDEN, 'Store access token into database failed')

      return Promise.resolve(apiResponse(status.OK, 'Login success', token, null))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.stat_code || status.INTERNAL_SERVER_ERROR, e.stat_message || e.message))
    }
  }
}
