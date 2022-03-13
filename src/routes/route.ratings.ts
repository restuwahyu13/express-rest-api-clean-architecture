import { Router } from 'express'

import { ControllerRatings } from '@controllers/controller.ratings'
import { DTORatings, DTORatingsByID } from '@dto/dto.ratings'
import { validator } from '@middlewares/middleware.validator'
import { transform } from '@middlewares/middleware.jwtTransform'
import { permission } from '@middlewares/middleware.permission'
import { auth } from '@middlewares/middleware.authorization'

class RouteRatings extends ControllerRatings {
  private router: Router

  constructor() {
    super()
    this.router = Router() as Router
  }

  main(): Router {
    this.router.post('/', [transform(), auth(), permission(['admin', 'customer']), validator(DTORatings)], this.createRatingsController)
    this.router.get('/', [transform(), auth(), permission(['admin', 'customer'])], this.resultsRatingsController)
    this.router.get(
      '/:user_id',
      [transform(), auth(), permission(['admin', 'customer']), validator(DTORatingsByID)],
      this.resultRatingsController
    )

    return this.router
  }
}

export default new RouteRatings().main()
