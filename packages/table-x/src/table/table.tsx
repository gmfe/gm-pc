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
  selectTableXHOC,
  indexTableXHOC,
  highlightTableXHOC,
} from '../hoc'

import BaseTable from './base_table'
import { HocMiddleware, TableProps } from './types'
import { applyMiddleware } from './util'
import dndTableXHOC from '../hoc/dnd_table_x'

function Table<D extends object = any>({
  isDiy,
  isDnd,
  isBatchSelect,
  isExpand,
  isSort,
  isEdit,
  isSub,
  isKeyboard,
  isSelect,
  isIndex,
  isHighlight,
  ...res
}: TableProps<D>) {
  const Table = useMemo(() => {
    // 按需引入
    let keyboardTableXHOC
    if (isKeyboard) {
      keyboardTableXHOC = require('@gm-pc/keyboard').keyboardTableXHOC
    }
    // 配置中间件
    const hocMiddles = [
      isDnd && dndTableXHOC,
      isExpand && expandTableXHOC,
      isBatchSelect && batchActionSelectTableXHOC,
      isHighlight && highlightTableXHOC,
      isSelect && selectTableXHOC,
      isIndex && indexTableXHOC,
      isDiy && diyTableXHOC,
      isSort && sortableTableXHOC,
      isEdit && editTableXHOC,
      isSub && subTableXHOC,
      isKeyboard && keyboardTableXHOC,
    ].filter(Boolean) as HocMiddleware[]

    const TempTable = applyMiddleware(...hocMiddles)(BaseTable)
    return TempTable as typeof BaseTable
  }, [
    isDiy,
    isBatchSelect,
    isExpand,
    isSort,
    isEdit,
    isSub,
    isKeyboard,
    isSelect,
    isIndex,
    isHighlight,
    isDnd,
  ])

  const tableProps = (res as unknown) as TableProps<D>
  return <Table {...tableProps} />
}
export default Table
