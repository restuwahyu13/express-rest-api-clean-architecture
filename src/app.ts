import 'reflect-metadata'
import 'dotenv/config'
import 'express-async-errors'
import reusify from 'reusify'
import express, { Express, Response, Request } from 'express'
import http, { Server } from 'http'
import { StatusCodes as status } from 'http-status-codes'
import * as typeorm from 'typeorm'
import { Container } from 'typeorm-typedi-extensions'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import userAgent from 'express-useragent'
import compression from 'compression'
import zlib from 'zlib'
import rateLimit from 'express-rate-limit'
import SlowDown from 'express-slow-down'
import hpp from 'hpp'
import nocache from 'nocache'
import gracefulShutdown from 'http-graceful-shutdown'
import session from 'express-session'
import consola from 'consola'

import { swaggerClient, swaggerServe } from '@libs/lib.swagger'
import { apiResponse } from '@helpers/helper.apiResponse'
import RouteUsers from '@routes/route.user'
import RouteRoles from '@routes/route.roles'
import RouteBooks from '@routes/route.books'
import RouteAuthors from '@routes/route.authors'
import RouteRatings from '@routes/route.ratings'

export class App {
  private app: Express
  private server: Server
  private version: string
  private env: string
  private port: number
  private pathEntitiesDir: string
  private pathMigrationDir: string

  constructor() {
    this.app = reusify(express).get() as Express
    this.server = http.createServer(this.app)
    this.version = '/api/v1'
    this.pathEntitiesDir = 'src/models/*.ts'
    this.pathMigrationDir = 'src/database/migrations'
    this.env = process.env.NODE_ENV
    this.port = +process.env.PORT
  }

  private connection(): Promise<typeorm.Connection> {
    typeorm.useContainer(Container)
    return typeorm.createConnection()
  }

  public async connectionTest(): Promise<typeorm.Connection> {
    typeorm.useContainer(Container)
    return typeorm.createConnection({
      type: 'postgres',
      host: process.env.DB_HOST as string,
      port: parseInt(process.env.DB_PORT as string),
      username: process.env.DB_USER as string,
      password: process.env.DB_PASSWORD as string,
      database: process.env.DB_NAME as string,
      entities: [this.pathEntitiesDir],
      migrations: [this.pathMigrationDir],
      synchronize: true,
      dropSchema: false,
      logger: undefined,
      logging: false,
      cli: {
        entitiesDir: this.pathEntitiesDir,
        migrationsDir: this.pathMigrationDir
      }
    })
  }

  private async config(): Promise<void> {
    this.app.disable('x-powered-by')
  }

  private async middleware(): Promise<void> {
    this.app.use(userAgent.express())
    this.app.use(nocache())
    this.app.use(bodyParser.json({ limit: '5mb' }))
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(helmet({ contentSecurityPolicy: false }))
    this.app.use(hpp({ checkBody: true, checkQuery: true }))
    this.app.use(
      cors({
        origin: '*',
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        credentials: true
      })
    )
    this.app.use(
      compression({
        strategy: zlib.constants.Z_RLE,
        level: zlib.constants.Z_BEST_COMPRESSION,
        memLevel: zlib.constants.Z_BEST_COMPRESSION
      })
    )
    this.app.use(
      rateLimit({
        windowMs: 24 * 60 * 3, // next request to endpoint
        max: 1000, // maximal request for all endpoint
        message: 'To many request, send back request after 3 minutes'
      })
    )
    this.app.use(
      SlowDown({
        windowMs: 24 * 60 * 1, // next request to endpoint
        delayMs: 24 * 60 * 2000, // increment delay
        delayAfter: 1000 // slow down after request
      })
    )
    this.app.use(
      session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET_KEY as string,
        cookie: { httpOnly: true, sameSite: 'strict' }
      })
    )
    if (!['production', 'test'].includes(this.env)) {
      this.app.use(`${this.version}/documentation`, swaggerServe, swaggerClient())
      this.app.use(morgan('dev'))
    }
  }

  private async route(): Promise<void> {
    this.app.use(`${this.version}/user`, RouteUsers)
    this.app.use(`${this.version}/role`, RouteRoles)
    this.app.use(`${this.version}/book`, RouteBooks)
    this.app.use(`${this.version}/author`, RouteAuthors)
    this.app.use(`${this.version}/rating`, RouteRatings)
  }

  private async globalRoute(): Promise<any> {
    this.app.all(['/', '/api/v1'], (_req: Request, res: Response) => res.status(status.OK).json(apiResponse(status.OK, 'Server Ping !')))
    this.app.all('**', (req: Request, res: Response) => {
      if (this.env == 'production' && req.path.match('documentation') && req.path.match('documentation')[0] == 'documentation') {
        return res
          .status(status.FORBIDDEN)
          .json(apiResponse(status.FORBIDDEN, 'API documentation only ready in development or staging environment'))
      }
      return res
        .status(status.NOT_FOUND)
        .json(apiResponse(status.NOT_FOUND, 'Route path is not exist on server', { hostname: req.hostname, path: req.path }, null))
    })
  }

  private async run(): Promise<void> {
    const connection: typeorm.Connection = await this.connection()
    const serverInfo: string = `Server is running on port: ${this.port}`

    if (this.env != 'production') {
      this.server.listen(this.port, () => consola.info(serverInfo))
    } else {
      gracefulShutdown(
        this.server.listen(this.port, () => consola.info(serverInfo)),
        {
          development: false,
          forceExit: true,
          timeout: 60000,
          onShutdown: async function (): Promise<void> {
            await connection.close()
          }
        }
      )
    }
  }

  public async main(): Promise<void> {
    await this.middleware()
    await this.config()
    await this.route()
    await this.globalRoute()
    await this.run()
  }

  public async mainTest(): Promise<Express> {
    await this.middleware()
    await this.config()
    await this.route()
    return this.app
  }
}

/**
 * @description boostraping app and run app with env development / production
 */

;(async function () {
  if (process.env.NODE_ENV != 'test') await new App().main()
})()
