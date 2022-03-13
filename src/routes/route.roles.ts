import { Router } from 'express'

import { ControllerRoles } from '@controllers/controller.roles'
import { DTORoles, DTORolesByID } from '@dto/dto.roles'
import { validator } from '@middlewares/middleware.validator'
import { transform } from '@middlewares/middleware.jwtTransform'
import { permission } from '@middlewares/middleware.permission'
import { auth } from '@middlewares/middleware.authorization'

class RouteRoles extends ControllerRoles {
  private router: Router

  constructor() {
    super()
    this.router = Router() as Router
  }

  main(): Router {
    this.router.post('/', [transform(), auth(), permission(['admin']), validator(DTORoles)], this.createRolesController)
    this.router.get('/', [transform(), auth(), permission(['admin'])], this.resultsRolesController)
    this.router.get('/:id', [transform(), auth(), permission(['admin']), validator(DTORolesByID)], this.resultRolesController)
    this.router.delete('/:id', [transform(), auth(), permission(['admin']), validator(DTORolesByID)], this.deleteRolesController)
    this.router.put('/:id', [transform(), auth(), permission(['admin']), validator(DTORoles)], this.updateRolesController)

    return this.router
  }
}

export default new RouteRoles().main()
