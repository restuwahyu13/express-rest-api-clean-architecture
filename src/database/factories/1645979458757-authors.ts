import Faker from 'faker'
import { define } from 'typeorm-seeding'

import { ModelAuthors } from '@models/model.authors'

define(ModelAuthors, (faker: Faker.FakerStatic): InstanceType<typeof ModelAuthors> => {
  const authors: InstanceType<typeof ModelAuthors> = new ModelAuthors()
  authors.firstname = faker.name.firstName()
  authors.lastname = faker.name.lastName()
  authors.place_of_birth = faker.address.country()
  authors.date_of_birth = faker.date.between('1970-01-01', new Date().toISOString())

  return authors
})
