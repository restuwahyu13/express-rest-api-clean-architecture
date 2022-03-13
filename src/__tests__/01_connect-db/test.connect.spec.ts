import 'mocha'
import shell from 'shelljs'
import { ExpressTest } from '../../configs/config.testing'

describe('Unit Testing - Run Migration and Seeds Database', function () {
  before(async function () {
    await ExpressTest.db()
    shell.exec('npm run seed:run')
  })

  it('Should be migration and seeds is working', async function () {
    ExpressTest.expect((await ExpressTest.connection).isConnected).to.be.equal(true)
  })
})
