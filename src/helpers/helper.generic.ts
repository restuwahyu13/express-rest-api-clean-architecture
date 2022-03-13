import { Request as ExpressRequest, Response as ExpressResponse } from 'express'

export interface Response extends ExpressResponse {}
export interface Request<T = Record<string, any>> extends ExpressRequest {
  body: T
}
