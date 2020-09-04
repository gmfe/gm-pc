import React, { useEffect } from 'react'
import Pagination from './pagination'
import { observable } from 'mobx'
import { Paging } from './types'
import { usePagination } from '@gm-common/hooks'
import { Button } from '../button'

const store = observable({
  paging: {
    offset: 0,
    limit: 10,
    need_count: true,
    count: 100,
    has_more: true,
  },
  setPaging(paging: Paging) {
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
  setPaging(paging: Paging) {
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

// todo 临时自己定义，后面以组件提供为准
interface PagingRequest {
  offset?: number
  limit?: number
  need_count?: boolean
}

interface Params {
  [propName: string]: any
  paging: PagingRequest
}

const paginationHookStore = observable({
  defaultPagingWithCount: {
    need_count: true,
  },

  req: {
    q: '',
  },

  setPaging(paging: any) {
    console.log(paging, 'ppppp')

    return { paging: { has_more: true, count: 100 } }
  },

  fetchData(params?: Params) {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(this.setPaging(params))
      }, 1000)
    )
  },
})

export const ComPagination = () => (
  <div>
    <Pagination paging={store.paging} onChange={(paging) => store.setPaging(paging)} />
    <div>without count</div>
    <Pagination paging={oStore.paging} onChange={(paging) => oStore.setPaging(paging)} />
  </div>
)

export const PaginationHook = () => {
  const { req, defaultPagingWithCount } = paginationHookStore
  const { loading, runChangePaging, paging, run } = usePagination(
    (params) => paginationHookStore.fetchData(params as Params),
    {
      defaultParams: { paging: { need_count: true, limit: 20 } },
      manual: true,
    }
  )
  const {
    loading: ncLoading,
    runChangePaging: ncRunChangePaging,
    paging: ncPaging,
    run: ncRun,
  } = usePagination((params) => paginationHookStore.fetchData(params as Params), {
    manual: true,
  })
  useEffect(() => {
    run({ ...req })
    ncRun({ ...req })
  }, [])

  const handleSearch = () => {
    const reqParam = { ...req, paging: { ...defaultPagingWithCount } }
    run(reqParam)
  }

  const handleNcSearch = () => {
    const reqParam = { ...req }
    ncRun(reqParam)
  }
  return (
    <div>
      <Button type='primary' loading={loading} onClick={handleSearch}>
        without count 搜索
      </Button>
      <Pagination paging={paging} onChange={runChangePaging} />
      <div>without count</div>
      <Button type='primary' loading={ncLoading} onClick={handleNcSearch}>
        with count 搜索
      </Button>
      <Pagination paging={ncPaging} onChange={ncRunChangePaging} />
    </div>
  )
}

export default {
  title: '表单/Pagination',
}
