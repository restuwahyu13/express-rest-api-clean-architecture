import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import faker from 'faker'
import bcrypt from 'bcryptjs'

import { ModelUsers } from '@models/model.users'

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(ModelUsers)().createMany(10)
    await connection
      .createQueryBuilder()
      .insert()
      .into(ModelUsers)
      .values([
        {
          email: faker.internet.email(),
          password: bcrypt.hashSync('qwerty12', bcrypt.genSaltSync(12)),
          role: { id: 1 }
        },
        {
          email: faker.internet.email(),
          password: bcrypt.hashSync('qwerty12', bcrypt.genSaltSync(12)),
          role: { id: 1 }
        },
        {
          email: faker.internet.email(),
          password: bcrypt.hashSync('qwerty12', bcrypt.genSaltSync(12)),
          role: { id: 1 }
        },
        {
          email: faker.internet.email(),
          password: bcrypt.hashSync('qwerty12', bcrypt.genSaltSync(12)),
          role: { id: 1 }
        },
        {
          email: faker.internet.email(),
          password: bcrypt.hashSync('qwerty12', bcrypt.genSaltSync(12)),
          role: { id: 1 }
        },
        {
          email: faker.internet.email(),
          password: bcrypt.hashSync('qwerty12', bcrypt.genSaltSync(12)),
          role: { id: 1 }
        },
        {
          email: faker.internet.email(),
          password: bcrypt.hashSync('qwerty12', bcrypt.genSaltSync(12)),
          role: { id: 1 }
        },
        {
          email: faker.internet.email(),
          password: bcrypt.hashSync('qwerty12', bcrypt.genSaltSync(12)),
          role: { id: 1 }
        },
        {
          email: faker.internet.email(),
          password: bcrypt.hashSync('qwerty12', bcrypt.genSaltSync(12)),
          role: { id: 1 }
        },
        {
          email: 'johndoe13@gmail.com',
          password: bcrypt.hashSync('qwerty12', bcrypt.genSaltSync(12)),
          role: { id: 1 }
        }
      ])
      .execute()
  }
}
