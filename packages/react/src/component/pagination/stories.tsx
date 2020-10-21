import React from 'react'
import Pagination from './pagination'
import { observable } from 'mobx'
import { PaginationPaging } from './types'

const store = observable({
  paging: {
    offset: 0,
    limit: 10,
    need_count: true,
    count: 100,
    has_more: true,
  },
  setPaging(paging: PaginationPaging) {
    console.log(paging)
    // @ts-ignore
    this.paging = paging
  },
})

const oStore = observable({
  paging: {
    offset: 0,
    limit: 10,
    need_count: false,
    count: undefined,
    has_more: true,
  },
  setPaging(paging: PaginationPaging) {
    console.log(paging)
    // @ts-ignore
    this.paging = paging
    // @ts-ignore
    if (paging.offset + paging.limit >= 100) {
      this.paging.has_more = false
    } else {
      this.paging.has_more = true
    }
  },
})

export const ComPagination = () => (
  <div>
    <Pagination
      paging={store.paging}
      onChange={(paging) => {
        store.setPaging(paging)
      }}
    />
    <div>without count</div>
    <Pagination
      paging={oStore.paging}
      onChange={(paging) => {
        oStore.setPaging(paging)
      }}
    />
  </div>
)

export default {
  title: '表单/Pagination',
}
