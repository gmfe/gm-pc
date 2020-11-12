import { TableXDataItem, TableXColumn } from '../base/types'
import { __DEFAULT_COLUMN } from './constant'
import { useMemo } from 'react'
import { useTable } from 'react-table'

// 给定初始值，交由getColumnStyle控制。width逻辑保持跟react-table（v6）的用法一致。
const defaultColumn = __DEFAULT_COLUMN

function useInitTable(columns: TableXColumn[], data: TableXDataItem[]) {
  // fixed(最新rc12不支持column.show,自己实现)
  columns = useMemo(() => columns.filter((column) => column.show !== false), [columns])

  const { getTableProps, getTableBodyProps, rows, prepareRow, headerGroups } = useTable({
    data,
    columns,
    defaultColumn,
  })

  let totalWidth = 0
  if (headerGroups[0] && headerGroups[0].headers) {
    const last = headerGroups[0].headers[headerGroups[0].headers.length - 1]
    totalWidth = last.totalLeft + last.totalWidth
  }

  return { getTableProps, getTableBodyProps, rows, prepareRow, headerGroups, totalWidth }
}

export default useInitTable
