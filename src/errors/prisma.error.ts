import { Prisma } from '@prisma/client'
import { ApiError } from './api.error'
import { ConflictError, NotFoundError } from './http.error'

export function handlePrismaError(error: unknown): ApiError {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return new ConflictError('Unique constraint violation')
      case 'P2025':
        return new NotFoundError('Record')
      default:
        return new ApiError(400, 'Database error')
    }
  }
  return new ApiError(500, 'Something went wrong')
}
