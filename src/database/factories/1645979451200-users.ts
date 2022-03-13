import Faker from 'faker'
import { define } from 'typeorm-seeding'
import bcrypt from 'bcryptjs'

import { ModelUsers } from '@models/model.users'

define(ModelUsers, (faker: Faker.FakerStatic): InstanceType<typeof ModelUsers> => {
  const users: InstanceType<typeof ModelUsers> = new ModelUsers()
  users.email = faker.internet.email()
  users.password = bcrypt.hashSync('qwerty12', bcrypt.genSaltSync(12))

  return users
})
