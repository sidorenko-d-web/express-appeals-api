import { ApiError } from './api.error'

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(400, message)
  }
}

export class UnproccesableEntity extends ApiError {
  constructor(message: string) {
    super(422, message)
  }
}

export class NotFoundError extends ApiError {
  constructor(entity: string) {
    super(404, `${entity} not found`)
  }
}

export class ConflictError extends ApiError {
  constructor(message: string) {
    super(409, message)
  }
}
