import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../errors/api.error'

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let error = err

  if (!(error instanceof ApiError)) {
    // Если ошибка не нашего типа, логируем детали
    console.error(`Unhandled Error: ${error.stack}`)
    error = new ApiError(500, 'Internal Server Error')
  }

  res.status((error as ApiError).statusCode).json({
    error: {
      message: error.message,
      code: (error as ApiError).statusCode
    }
  })
}
