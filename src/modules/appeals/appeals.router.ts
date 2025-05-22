import { Response, Router } from 'express'
import { AppealController } from './appeals.controller'
import {
  validateAllInProgress,
  validateChangeStatus,
  validateCreateAppeal,
  validateGetAllAppeal
} from './appeals.schema'
import { AppealService } from './appeals.service'

const router = Router()

router.post('/appeals', validateCreateAppeal, AppealController.create)
router.get('/appeals', validateGetAllAppeal, AppealController.getAll)

router.patch(
  '/appeals/:id/set-in-progress',
  validateChangeStatus,
  AppealController.setInProgress
)
router.patch(
  '/appeals/:id/set-finished',
  validateChangeStatus,
  AppealController.setFinished
)
router.patch(
  '/appeals/:id/set-declined',
  validateChangeStatus,
  AppealController.setDeclined
)
router.patch(
  '/appeals/decline-all-in-progress',
  validateAllInProgress,
  AppealController.declineAllInProgress
)

export { router as AppealRouter }
