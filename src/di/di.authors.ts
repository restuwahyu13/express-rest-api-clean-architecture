import { Container, Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { ModelAuthors } from '@models/model.authors'

interface Entity {
  authors: Repository<ModelAuthors>
}

@Service()
class DependencyInjection {
  @InjectRepository(ModelAuthors)
  authorsRepository: Repository<ModelAuthors>
}

export class Model {
  model(): Entity {
    return {
      authors: Container.get(DependencyInjection).authorsRepository
    }
  }
}
