/*
 * @Description: 组合各种中间件列表
 */
import React, { useMemo } from 'react'
import {
  diyTableXHOC,
  batchActionSelectTableXHOC,
  expandTableXHOC,
  sortableTableXHOC,
  editTableXHOC,
  subTableXHOC,
} from '../hoc'
import { keyboardTableXHOC } from '@gm-pc/keyboard'
import BaseTable from './base_table'
import { HocMiddleware, TableProps } from './types'
import { applyMiddleware } from './util'

function Table<D extends object = any>({
  isDiy,
  isBatchSelect,
  isExpand,
  isSort,
  isEdit,
  isSub,
  isKeyboard,
  ...res
}: TableProps<D>) {
  const Table = useMemo(() => {
    // 配置中间件
    const hocMiddles = [
      isDiy && diyTableXHOC,
      isBatchSelect && batchActionSelectTableXHOC,
      isExpand && expandTableXHOC,
      isSort && sortableTableXHOC,
      isEdit && editTableXHOC,
      isSub && subTableXHOC,
      isKeyboard && keyboardTableXHOC,
    ].filter(Boolean) as HocMiddleware[]

    const TempTable = applyMiddleware(...hocMiddles)(BaseTable)
    return TempTable as typeof BaseTable
  }, [isDiy, isBatchSelect, isExpand, isSort, isEdit, isSub, isKeyboard])

  const tableProps = (res as unknown) as TableProps<D>
  return <Table {...tableProps} />
}
export default Table
