import { Response } from 'express'
import {
  APPEAL_STATUS,
  TypeChangeAppealStatusRequest,
  TypeCreateAppealRequest,
  TypeDeclineAllAppealsInProgressRequest,
  TypeFindWithRangeRequest
} from './appeals.types'
import { AppealService } from './appeals.service'

export const AppealController = {
  create: async (req: TypeCreateAppealRequest, res: Response) => {
    await AppealService.create(req.body)
    res.sendStatus(201)
  },

  getAll: async (req: TypeFindWithRangeRequest, res: Response) => {
    let result

    if (req.body?.date) {
      result = await AppealService.getAllByExactDate(req.body.date)
    } else if (req.body?.date_range_end && req.body?.date_range_start) {
      const { date_range_end, date_range_start } = req.body

      result = await AppealService.getAllByDateRange({
        date_range_end,
        date_range_start
      })
    } else {
      result = await AppealService.getAll()
    }

    res.json({ appeals: result }).status(200)
  },

  setInProgress: async (req: TypeChangeAppealStatusRequest, res: Response) => {
    const data = {
      status: APPEAL_STATUS.IN_PROGRESS,
      id: req.params?.id
    }
    await AppealService.patchAppealWithStatus(data)
    res.sendStatus(204)
  },

  setFinished: async (req: TypeChangeAppealStatusRequest, res: Response) => {
    const data = {
      status: APPEAL_STATUS.FINISHED,
      id: req.params?.id,
      processed_text: req.body.processed_text
    }
    await AppealService.patchAppealWithStatus(data)
    res.sendStatus(204)
  },

  setDeclined: async (req: TypeChangeAppealStatusRequest, res: Response) => {
    const data = {
      status: APPEAL_STATUS.DECLINED,
      id: req.params?.id,
      processed_text: req.body.processed_text
    }
    await AppealService.patchAppealWithStatus(data)
    res.sendStatus(204)
  },

  declineAllInProgress: async (
    req: TypeDeclineAllAppealsInProgressRequest,
    res: Response
  ) => {
    await AppealService.declineAllInProgress({
      processed_text: req.body?.processed_text
    })
    res.sendStatus(204)
  }
}
