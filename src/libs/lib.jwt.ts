import { StatusCodes as Status } from 'http-status-codes'
import { decrypt, encrypt } from 'jwt-transform'
import jwt from 'jsonwebtoken'

import { ExpressError } from '@helpers/helper.error'
import { convertTime } from '@helpers/helper.convertTime'

const secretKey: string = process.env.JWT_SECRET_KEY || ''
const typeTime: Record<string, any> = {
  days: 'd',
  minute: 'm',
  second: 's'
}

export interface IToken {
  accessToken: string
  refreshToken: string
  accessTokenExpired: string
  refreshTokenExpired: string
}

export interface ITokenMixed {
  accessToken: string
  refreshToken: string
  accessTokenExpired: string
  refreshTokenExpired: string
  status: string
}

interface Ioptions {
  expiredAt: number
  type: string
}

const healthToken = async (accessToken: string): Promise<boolean> => {
  const decryptAccessToken: string = await decrypt(accessToken, 20)
  const decodedAccesToken: string | jwt.JwtPayload = jwt.verify(decryptAccessToken, secretKey, { audience: 'node-app' })

  if (!decodedAccesToken || decodedAccesToken instanceof jwt.JsonWebTokenError) return false
  return true
}

export const signToken = async (data: Record<string, any>, options: Ioptions): Promise<IToken> => {
  try {
    const accessToken: string = jwt.sign({ ...data }, secretKey, {
      expiresIn: `${options.expiredAt}${typeTime[options.type]}`,
      audience: 'node-app'
    })
    const refreshToken: string = jwt.sign({ ...data }, secretKey, { expiresIn: '30d', audience: 'node-app' })

    const token: IToken = {
      accessToken: await encrypt(accessToken, 20),
      refreshToken: await encrypt(refreshToken, 20),
      accessTokenExpired: `${convertTime(options.expiredAt as number, 'days')} Days`,
      refreshTokenExpired: `${convertTime(30, 'days')} Days`
    }

    return token
  } catch (e: any) {
    return Promise.reject(new ExpressError('Generate accessToken and refreshToken failed' || e.message))
  }
}

export const verifyToken = async (accessToken: string): Promise<jwt.JwtPayload | string> => {
  try {
    const decodedToken: string | jwt.JwtPayload = jwt.verify(accessToken, secretKey, { audience: 'node-app' })
    return decodedToken
  } catch (e: any) {
    return Promise.reject(new ExpressError('Verified accessToken expired or invalid'))
  }
}

export const refreshToken = async (accessToken: string, refreshToken: string, options: Ioptions): Promise<Record<string, any> | string> => {
  try {
    let token: ITokenMixed

    const decryptAccessToken: string = await decrypt(accessToken, 20)
    const decryptRefreshToken: string = await decrypt(refreshToken, 20)

    if (!healthToken(accessToken)) {
      if (!accessToken || !refreshToken) {
        throw { code: Status.BAD_REQUEST, message: 'Get accessToken and refreshToken from disk failed' }
      }

      const getAccessTokenData: jwt.JwtPayload = jwt.decode(decryptAccessToken) as any
      const getRefreshTokenData: jwt.JwtPayload = jwt.decode(decryptRefreshToken) as any

      const newAccessToken: string = jwt.sign({ ...getAccessTokenData }, secretKey, {
        expiresIn: `${options.expiredAt}${typeTime[options.type]}`,
        audience: 'node-app'
      })

      const newRefreshToken: string = jwt.sign({ ...getRefreshTokenData }, secretKey, {
        expiresIn: '30d',
        audience: 'node-app'
      })

      token = {
        status: 'AccessToken Not Health, and this is new accessToken and refreshToken',
        accessToken: await encrypt(newAccessToken, 20),
        refreshToken: await encrypt(newRefreshToken, 20),
        accessTokenExpired: `${convertTime(options.expiredAt as number, 'days')} Days`,
        refreshTokenExpired: `${convertTime(30, 'days')} Days`
      }
    } else {
      token = {
        status: 'AccessToken Is Health, and this is old accessToken and refreshToken',
        accessToken: await encrypt(decryptAccessToken, 20),
        refreshToken: await encrypt(decryptRefreshToken, 20),
        accessTokenExpired: `${convertTime(options.expiredAt as number, 'days')} Days`,
        refreshTokenExpired: `${convertTime(30, 'days')} Days`
      }
    }

    return token
  } catch (e: any) {
    return Promise.reject(new ExpressError('Generate new accessToken and refreshToken failed' || e.message))
  }
}
