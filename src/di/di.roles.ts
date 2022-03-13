import { Container, Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { ModelRoles } from '@models/model.roles'

interface Entity {
  roles: Repository<ModelRoles>
}

@Service()
class DependencyInjection {
  @InjectRepository(ModelRoles)
  rolesRepository: Repository<ModelRoles>
}

export class Model {
  model(): Entity {
    return {
      roles: Container.get(DependencyInjection).rolesRepository
    }
  }
}
