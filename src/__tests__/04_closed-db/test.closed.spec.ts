import 'mocha'
import shell from 'shelljs'
import { ExpressTest } from '../../configs/config.testing'

describe('Integation Testing - Run Rollback Database', function () {
  after(async function () {
    shell.exec('npm run orm:rollback')
    await ExpressTest.teardown()
  })

  it('Should be rollback database is working', async function () {
    ExpressTest.expect((await ExpressTest.connection).isConnected).to.be.equal(true)
  })
})
