import { Router } from 'express'

import { ControllerAuthors } from '@controllers/controller.authors'
import { DTOAuthors, DTOAuthorsById } from '@dto/dto.authors'
import { validator } from '@middlewares/middleware.validator'
import { transform } from '@middlewares/middleware.jwtTransform'
import { permission } from '@middlewares/middleware.permission'
import { auth } from '@middlewares/middleware.authorization'

export class RouteAuthors extends ControllerAuthors {
  private router: Router

  constructor() {
    super()
    this.router = Router() as Router
  }

  main(): Router {
    this.router.post('/', [transform(), auth(), permission(['admin']), validator(DTOAuthors)], this.createAuthorsController)
    this.router.get('/', [transform(), auth(), permission(['admin'])], this.resultsAuthorsController)
    this.router.get('/:id', [transform(), auth(), permission(['admin']), validator(DTOAuthorsById)], this.resultAuthorsController)
    this.router.delete('/:id', [transform(), auth(), permission(['admin']), validator(DTOAuthorsById)], this.deleteAuthorsController)
    this.router.put('/:id', [transform(), auth(), permission(['admin']), validator(DTOAuthors)], this.updateAuthorsController)

    return this.router
  }
}

export default new RouteAuthors().main()
