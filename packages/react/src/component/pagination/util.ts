import { PaginationPaging } from './types'

function getIndex(paging: PaginationPaging): number {
  return paging.offset / paging.limit + 1
}

export { getIndex }
