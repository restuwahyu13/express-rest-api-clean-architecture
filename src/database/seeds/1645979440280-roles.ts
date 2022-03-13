import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'

import { ModelRoles } from '@models/model.roles'

export default class CreateRoles implements Seeder {
  public async run(_factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(ModelRoles)
      .values([{ name: 'admin' }, { name: 'customer' }, { name: 'author' }])
      .execute()
  }
}
