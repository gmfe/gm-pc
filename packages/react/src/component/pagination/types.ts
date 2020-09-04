interface PaginationPaging {
  offset: number
  limit: number
  need_count: boolean

  /** 没有 count 的时候用 */
  has_more?: boolean
  count?: number
}

interface PaginationProps {
  paging: PaginationPaging
  onChange(paging: PaginationPaging): void
}

export type { PaginationProps, PaginationPaging }
