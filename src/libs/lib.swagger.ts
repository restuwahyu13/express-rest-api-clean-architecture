import { RequestHandler } from 'express'
import swagger from 'swagger-ui-express'
import path from 'path'
import fs from 'fs'

import { ExpressError } from '@helpers/helper.error'

export const swaggerServe: RequestHandler[] = swagger.serve
export const swaggerClient = (): RequestHandler => {
  let fsResponse: string
  let swaggerConfig: swagger.JsonObject
  let env: string = process.env.NODE_ENV

  const stagingPath: string = path.resolve(process.cwd(), 'dist/openapi.json')
  const developmentPath: string = path.resolve(process.cwd(), 'openapi.json')

  if (env == ('development' || 'staging')) {
    if (env == 'development' && fs.existsSync(developmentPath)) fsResponse = fs.readFileSync(developmentPath, { encoding: 'utf8' })
    if (env == 'staging' && fs.existsSync(stagingPath)) fsResponse = fs.readFileSync(stagingPath, { encoding: 'utf8' })
    swaggerConfig = JSON.parse(fsResponse)

    return swagger.setup(swaggerConfig)
  }

  if (env == 'production') throw new ExpressError('Cannot load swagger file documentation in production')
}
