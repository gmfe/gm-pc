// 内部的， offset limit 都有
interface InnerPaging {
  offset: number
  limit: number
  need_count?: boolean

  has_more: boolean
  count?: number
}

interface CommonProps {
  //
  paging: InnerPaging
  onChange(paging: Paging): void
}

interface Paging {
  offset?: number
  limit?: number
  need_count?: boolean

  has_more: boolean
  count?: number
}

interface PaginationProps {
  paging: Paging
  onChange(paging: Paging): void
}

export type { CommonProps, PaginationProps, InnerPaging, Paging }
