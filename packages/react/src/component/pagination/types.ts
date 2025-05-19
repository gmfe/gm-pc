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
  // 指定每页可以显示多少条
  pageSizeOptions?: string[]
  onChange(paging: PaginationPaging): void
}

export type { PaginationProps, PaginationPaging }
