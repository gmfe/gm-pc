import { InnerPaging } from './types'

function getIndex(paging: InnerPaging): number {
  return paging.offset / paging.limit + 1
}

export { getIndex }
