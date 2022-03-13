import { Container, Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { ModelUsers } from '@models/model.users'
import { ModelSecret } from '@models/model.secret'

interface Entity {
  users: Repository<ModelUsers>
  secrets: Repository<ModelSecret>
}

@Service()
class DependencyInjection {
  @InjectRepository(ModelUsers)
  usersRepository: Repository<ModelUsers>

  @InjectRepository(ModelSecret)
  secretsRepository: Repository<ModelSecret>
}

export class Model {
  model(): Entity {
    return {
      users: Container.get(DependencyInjection).usersRepository,
      secrets: Container.get(DependencyInjection).secretsRepository
    }
  }
}
