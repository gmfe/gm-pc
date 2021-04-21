import React, {
  HTMLAttributes,
  TableHTMLAttributes,
  CSSProperties,
  FC,
  UIEvent,
  useState,
  useCallback,
} from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import { useInitTable, afterScroll } from '../utils'
import { Empty, Loading } from '../components'
import Thead from './thead'
import Tr from './tr'
import {
  TableXHeaderGroup,
  TableXProps,
  TableXRow,
  OnHeaderSort,
  SortsType,
} from './types'

const TableX: FC<TableXProps> = ({
  columns,
  data,
  loading,
  SubComponent,
  keyField = 'value',
  tiled,
  border,
  headerSortMultiply,
  isTrHighlight,
  isTrDisable,
  onScroll,
  onHeadersSort,
  className,
  ...rest
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    totalWidth,
    prepareRow,
    headerGroups,
    rows,
  } = useInitTable(columns, data)
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const [sorts, setSorts] = useState<SortsType>(initSorts)

  function initSorts() {
    const sortsObject: SortsType = {}
    columns.forEach(({ headerSort, id }) => {
      if (headerSort) {
        sortsObject[id!] = null
      }
    })
    return sortsObject
  }
  const gtp = getTableProps()
  const tableProps: TableHTMLAttributes<HTMLTableElement> = {
    ...gtp,
    style: { minWidth: `${totalWidth}px` },
    className: classNames('gm-table-x-table', gtp.className),
  }

  const gtbp = getTableBodyProps()
  const tableBodyProps: HTMLAttributes<HTMLTableSectionElement> = {
    ...gtbp,
    className: 'gm-table-x-tbody',
  }

  const handleScroll = (event: UIEvent<HTMLDivElement>): void => {
    onScroll && onScroll(event)
    afterScroll()
  }

  const renderRow = ({ index, style }: { index: number; style: CSSProperties }) => {
    const row = rows[index]
    prepareRow(row)

    return (
      <Tr
        key={row.index}
        row={row as TableXRow}
        SubComponent={SubComponent}
        keyField={keyField}
        style={style}
        totalWidth={totalWidth}
        isTrHighlight={isTrHighlight}
        isTrDisable={isTrDisable}
      />
    )
  }

  const onHeaderSort: OnHeaderSort = useCallback(
    ({ field, direction }) => {
      setSorts((sorts) => {
        let newSorts = { [field]: direction }
        if (headerSortMultiply) {
          newSorts = { ...sorts, [field]: direction }
        }
        // 放入宏任务队列，避免警告
        setTimeout(() => {
          onHeadersSort && onHeadersSort(_.pickBy(newSorts, _.identity))
        })
        return newSorts
      })
    },
    [headerSortMultiply, onHeadersSort]
  )
  return (
    <div
      {...rest}
      className={classNames(
        'gm-table-x',
        {
          'gm-table-x-empty': data.length === 0,
          'gm-table-x-tiled': tiled,
          'gm-table-x-border': border,
        },
        className
      )}
      onScroll={handleScroll}
    >
      <table {...tableProps}>
        <Thead
          headerGroups={headerGroups as TableXHeaderGroup[]}
          totalWidth={totalWidth}
          onHeaderSort={onHeaderSort}
          sorts={sorts}
        />
        <tbody {...tableBodyProps}>
          {rows.map((row) => renderRow({ index: row.index, style: {} }))}
        </tbody>
      </table>
      {loading && <Loading />}
      {!loading && !data.length && <Empty />}
    </div>
  )
}

export default TableX
