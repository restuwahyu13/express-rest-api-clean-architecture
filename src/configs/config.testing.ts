import { Express } from 'express'
import * as typeorm from 'typeorm'
import { expect, request as superagent, use } from 'chai'
import chaiHttp from 'chai-http'

import { App } from '../app'

/**
 * @description initialize middleware for chai here
 */

use(chaiHttp)

/**
 * @description initialize application and database connection for testing here
 */

export class ExpressTest {
  static connection: typeorm.Connection
  static expect = expect
  static superagent = superagent

  static async app(): Promise<Express> {
    return (await new App().mainTest()) as Express
  }

  static async db(): Promise<typeorm.Connection> {
    this.connection = (await new App().connectionTest()) as typeorm.Connection
    return this.connection
  }

  static async connect(): Promise<void> {
    ;(await this.connection).connect()
  }

  static async teardown(): Promise<void> {
    ;(await this.connection).close()
  }
}
