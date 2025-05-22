import { Request, Response, NextFunction } from 'express'
import {
  BadRequestError,
  UnproccesableEntity
} from '../../errors/http.error'
import { isDate, isString } from '../../helpers/validators'
import { TypeChangeAppealStatusRequest } from './appeals.types'

export const validateCreateAppeal = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //validate theme field
  if (!req.body?.theme || !isString(req.body.theme)) {
    throw new BadRequestError('"theme" must be string')
  }
  if (req.body?.theme.trim().length < 5) {
    throw new UnproccesableEntity('theme must be at least 5 characters long')
  }

  //validate appeal_text field
  if (!req.body?.appeal_text || !isString(req.body.appeal_text)) {
    throw new BadRequestError('"appeal_text" must be string')
  }
  if (req.body?.appeal_text.trim().length < 10) {
    throw new UnproccesableEntity(
      '"appeal_text" must be at least 10 characters long'
    )
  }

  next()
}

export const validateGetAllAppeal = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const keys = Object.keys(req.body)

  validateClearGetAllRequest(keys)
  validateExactDateRequest(req, keys)
  validateDatesRangeRequest(req, keys)

  next()
}

const validateClearGetAllRequest = (keys: string[]) => {
  if (
    !keys.some((item) =>
      ['date', 'date_range_start', 'date_range_end'].includes(item)
    ) &&
    keys.length > 0
  ) {
    throw new BadRequestError(
      'Body fields should be "date" or "date_range_start" and "date_range_end" pair'
    )
  }
}

const validateExactDateRequest = (req: Request, keys: string[]) => {
  if (!req.body?.date) return

  if (keys.length > 1) {
    throw new BadRequestError(
      'If "date" in use body should not contain any other fields'
    )
  }

  if (!isDate(req.body.date))
    throw new UnproccesableEntity('Body contains invalid date string')
}

const validateDatesRangeRequest = (req: Request, keys: string[]) => {
  if (!req.body?.date_range_end || !req.body?.date_range_start) return

  if (!req.body?.date_range_end || !req.body?.date_range_start) {
    throw new BadRequestError('Range fields should be provived together')
  }

  const { date_range_start, date_range_end } = req.body

  if (keys.length > 2) {
    throw new BadRequestError(
      'Range request should contain only "date_range_start" and "date_range_end" fields'
    )
  }

  if (!(isDate(date_range_start) && date_range_end)) {
    throw new UnproccesableEntity('Body contains invalid date string')
  }

  const rangeTimeNumber =
    new Date(date_range_end).getTime() - new Date(date_range_start).getTime()

  if (rangeTimeNumber < 0) {
    throw new UnproccesableEntity(
      'date_range_start should be earlier than date_range_end'
    )
  }

  if (rangeTimeNumber < 1000 * 60 * 60 * 24) {
    throw new UnproccesableEntity('Dates range should be more than 1 day')
  }
}

export const validateChangeStatus = (
  req: TypeChangeAppealStatusRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.params?.id)
    throw new BadRequestError('Id of an appeal should be provived')
  console.log(req.path.includes('in-progress'))
  if (req.path.includes('in-progress')) {
    if (req.body.processed_text) {
      throw new BadRequestError(
        '"processed_text" should not be provived in this endpoint'
      )
    }
  } else {
    validateProcessedTextField(req.body.processed_text)
  }

  next()
}

const validateProcessedTextField = (text?: string) => {
  if (!text)
    throw new BadRequestError(
      '"processed_text" should be provived in this endpoint'
    )

  if (!isString(text))
    throw new UnproccesableEntity('"processed_text" should be a string')

  if (text?.length < 10)
    throw new UnproccesableEntity(
      '"processed_text" should have at least 10 characters'
    )
}

export const validateAllInProgress = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validateProcessedTextField(req.body.processed_text)

  next()
}
