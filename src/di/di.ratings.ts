import { Container, Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { ModelRatings } from '@models/model.ratings'

interface Entity {
  ratings: Repository<ModelRatings>
}

@Service()
class DependencyInjection {
  @InjectRepository(ModelRatings)
  ratingsRepository: Repository<ModelRatings>
}

export class Model {
  model(): Entity {
    return {
      ratings: Container.get(DependencyInjection).ratingsRepository
    }
  }
}
