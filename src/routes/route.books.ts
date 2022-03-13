import { Router } from 'express'

import { ControllerBooks } from '@controllers/controller.books'
import { DTOBooks, DTOBooksByID } from '@dto/dto.books'
import { upload } from '@libs/lib.multer'
import { validator } from '@middlewares/middleware.validator'
import { transform } from '@middlewares/middleware.jwtTransform'
import { permission } from '@middlewares/middleware.permission'
import { auth } from '@middlewares/middleware.authorization'

class RouteBooks extends ControllerBooks {
  private router: Router

  constructor() {
    super()
    this.router = Router() as Router
  }

  main(): Router {
    this.router.post('/', [transform(), auth(), permission(['admin']), upload.array('images'), validator(DTOBooks)], this.createBooksController)
    this.router.get('/', [transform(), auth(), permission(['admin'])], this.resultsBooksController)
    this.router.get('/:id', [transform(), auth(), permission(['admin']), validator(DTOBooksByID)], this.resultBooksController)
    this.router.delete('/:id', [transform(), auth(), permission(['admin']), validator(DTOBooksByID)], this.deleteBooksController)
    this.router.put(
      '/:id',
      [transform(), auth(), permission(['admin']), upload.array('images'), validator(DTOBooks)],
      this.updateBooksController
    )

    return this.router
  }
}

export default new RouteBooks().main()
