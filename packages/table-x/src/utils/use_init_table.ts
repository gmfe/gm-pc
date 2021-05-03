import { SortsType, OnHeaderSort, TableXProps } from '../base/types'
import { __DEFAULT_COLUMN } from './constant'
import { useState, useMemo, useCallback } from 'react'
import { useTable } from 'react-table'
import _ from 'lodash'
// 给定初始值，交由getColumnStyle控制。width逻辑保持跟react-table（v6）的用法一致。
const defaultColumn = __DEFAULT_COLUMN

function useInitTable(props: TableXProps) {
  const { data, onHeadersSort, headerSortMultiple } = props
  let { columns } = props
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
  const initSorts = () => {
    const sortsObject: SortsType = {}
    columns.forEach(({ headerSort, id, defaultSortDirection = null }) => {
      // 如果配置了headerSort,加入obj
      if (headerSort && id) {
        // 有默认排序方向，加入默认排序方向，否则为null
        sortsObject[id] = defaultSortDirection
      }
    })
    return sortsObject
  }
  // 用于表头排序
  const [sorts, setSorts] = useState<SortsType>(initSorts)

  const onHeaderSort: OnHeaderSort = useCallback(
    ({ field, direction }) => {
      setSorts((sorts) => {
        let newSorts = { [field]: direction }
        if (headerSortMultiple) {
          newSorts = { ...sorts, [field]: direction }
        }
        // 放入宏任务队列，避免警告
        setTimeout(() => {
          onHeadersSort && onHeadersSort(_.pickBy(newSorts, _.identity))
        })
        return newSorts
      })
    },
    [headerSortMultiple, onHeadersSort]
  )
  return {
    rows,
    headerGroups,
    totalWidth,
    sorts,
    getTableProps,
    getTableBodyProps,
    prepareRow,
    onHeaderSort,
  }
}

export default useInitTable
