import { Container, Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { ModelBooks } from '@models/model.books'

interface Entity {
  books: Repository<ModelBooks>
}

@Service()
class DependencyInjection {
  @InjectRepository(ModelBooks)
  booksRepository: Repository<ModelBooks>
}

export class Model {
  model(): Entity {
    return {
      books: Container.get(DependencyInjection).booksRepository
    }
  }
}
