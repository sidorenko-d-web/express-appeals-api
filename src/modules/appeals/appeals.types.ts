import { Appeal } from '@prisma/client'
import { Request } from 'express'

export const APPEAL_STATUS = {
  NEW: 'NEW',
  IN_PROGRESS: 'IN_PROGRESS',
  FINISHED: 'FINISHED',
  DECLINED: 'DECLINED'
}
export type TypeAppealStatus = keyof typeof APPEAL_STATUS

export interface IAppeal extends Appeal {
  status: TypeAppealStatus
}

export type TypeCreateAppeal = Omit<IAppeal, 'id' | 'processed_text' | 'status'>
export type TypePatchAppeal = Pick<Appeal, 'id' | 'status'> & {
  processed_text?: string
}

export type TypeFindWithRange = {
  date_range_start?: Date
  date_range_end?: Date
  date?: Date
}

type TypeRequestWithId = { id: string }

export type TypeCreateAppealRequest = Request<{}, {}, TypeCreateAppeal>
export type TypeFindWithRangeRequest = Request<
  TypeRequestWithId,
  {},
  TypeFindWithRange
>
export type TypeChangeAppealStatusRequest = Request<
  TypeRequestWithId,
  {},
  Pick<TypePatchAppeal, 'processed_text'>
>
export type TypeDeclineAllAppealsInProgressRequest = Request<
  {},
  {},
  Pick<TypePatchAppeal, 'processed_text'>
>
