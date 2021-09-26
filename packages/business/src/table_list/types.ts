import { RefObject } from 'react'
import { TableProps, Column, TableInstance, SortsType } from '@gm-pc/table-x'
import { UsePaginationOptions } from '@gm-common/hooks'
import { PagingRes } from '@gm-common/hooks/src/types'
import { TotalTextOptions } from './table_total_text'

export type BaseTableListType = Pick<TableProps, 'tableRef'>
export interface FilterProps {
  onExport: (...arg: any) => Promise<any>
}

export type TableListColumn<D extends object = any> = Column<D>

export type FormatDataType = (data: { paging: PagingRes; data: any[] }) => any[]
export type TableListInstance = TableInstance & {
  refresh(): Promise<any>
  /** 对应删除的刷新，如果当前页有10条数据，一次性删除了10条，那么会调用run跳到第一条，否则调用refresh刷新当前页 */
  refreshAfterDelete(delNum: number): Promise<any>
  run(): Promise<any>
}
export type TableListRef = RefObject<TableListInstance>
export interface TableListProps<D extends object = any>
  extends Omit<TableProps<D>, 'tableRef' | 'data'> {
  data?: TableProps<D>['data']
  tableRef?: TableListRef
  /** 列表汇总 */
  totalTextData?: TotalTextOptions[]
  /** 列表筛选参数, 请保证不可变性 */
  filter?: any
  /** 回传给service的参数中对应的filter的key名，默认为filter */
  filterProp?: string
  paginationOptions?: UsePaginationOptions<any, any>
  /** 表头是否排序 */
  isHeaderSort?: boolean
  /** didMount的时候时候请求数据 */
  isUpdateEffect?: boolean
  /** filter run回传的时候是否展开 */
  isFilterSpread?: boolean
  /** 列表请求接口 请保证不可变性 */
  service(...args: any): Promise<any>
  /** 列表接口响应数据格式化，返回值为数组 */
  formatData?: FormatDataType
}

export interface HandleParamsProps
  extends Pick<
    TableListProps,
    'filter' | 'filterProp' | 'isHeaderSort' | 'isFilterSpread'
  > {
  sorts: SortsType
}
