import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'

import { ModelAuthors } from '@models/model.authors'

export default class CreateAuthors implements Seeder {
  public async run(factory: Factory, _connection: Connection): Promise<any> {
    await factory(ModelAuthors)().createMany(10)
  }
}
