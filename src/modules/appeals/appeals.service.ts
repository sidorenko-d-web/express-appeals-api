import { prisma } from '../../config/db'
import { ConflictError, NotFoundError } from '../../errors/http.error'
import {
  APPEAL_STATUS,
  TypeCreateAppeal,
  TypeFindWithRange,
  TypePatchAppeal
} from './appeals.types'

export const AppealService = {
  //POST
  create: async (data: TypeCreateAppeal) =>
    await prisma.appeal.create({ data }),

  // GET
  getAll: async () => {
    const result = await prisma.appeal.findMany()
    if (!result || result.length === 0) throw new NotFoundError('Appeals')
    return result
  },

  getAllByExactDate: async (date: Date) => {
    const rangeStart = new Date(date)
    const rangeEnd = new Date(rangeStart)
    rangeEnd.setDate(rangeStart.getDate() + 1)

    const result = await prisma.appeal.findMany({
      where: { createdAt: { gte: rangeStart, lt: rangeEnd } }
    })

    if (!result || result.length === 0) throw new NotFoundError('Appeals')
    return result
  },

  getAllByDateRange: async (dates: Omit<TypeFindWithRange, 'date'>) => {
    const result = await prisma.appeal.findMany({
      where: {
        createdAt: { gte: dates.date_range_start, lt: dates.date_range_end }
      }
    })

    if (!result || result.length === 0) throw new NotFoundError('Appeals')
    return result
  },

  //PATCH
  patchAppealWithStatus: async ({ id, ...data }: TypePatchAppeal) => {
    const appeal = await prisma.appeal.findFirst({
      where: {
        id,
        OR: [
          { status: APPEAL_STATUS.DECLINED },
          { status: APPEAL_STATUS.FINISHED }
        ]
      }
    })
    if (appeal) {
      throw new ConflictError(
        `The appeal with status "${appeal?.status}" can not be modified!`
      )
    }

    const result = await prisma.appeal.updateMany({ where: { id }, data })
    if (result.count === 0) throw new NotFoundError('Appeal ' + id)
    return result
  },

  declineAllInProgress: async ({
    processed_text
  }: Pick<TypePatchAppeal, 'processed_text'>) => {
    const result = await prisma.appeal.updateMany({
      where: { status: APPEAL_STATUS.IN_PROGRESS },
      data: { status: APPEAL_STATUS.DECLINED, processed_text }
    })

    if (result.count === 0) {
      throw new NotFoundError(
        `Appeals with status "${APPEAL_STATUS.IN_PROGRESS}"`
      )
    }

    return result
  }
}
