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

router.post('/appeal', validateCreateAppeal, AppealController.create)
router.get('/appeal', validateGetAllAppeal, AppealController.getAll)

router.patch(
  '/appeal/:id/set-in-progress',
  validateChangeStatus,
  AppealController.setInProgress
)
router.patch(
  '/appeal/:id/set-finished',
  validateChangeStatus,
  AppealController.setFinished
)
router.patch(
  '/appeal/:id/set-declined',
  validateChangeStatus,
  AppealController.setDeclined
)
router.patch(
  '/appeal/decline-all-in-progress',
  validateAllInProgress,
  AppealController.declineAllInProgress
)

export { router as AppealRouter }
