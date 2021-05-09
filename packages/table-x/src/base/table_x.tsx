import React, {
  HTMLAttributes,
  TableHTMLAttributes,
  CSSProperties,
  UIEvent,
  useImperativeHandle,
} from 'react'
import classNames from 'classnames'

import { useInitTable, afterScroll, getDiyShowMap } from '../utils'
import { Empty, Loading } from '../components'
import Thead from './thead'
import Tr from './tr'
import { TableXColumn, TableXHeaderGroup, TableXProps, TableXRow } from './types'
/**
 * 请使用Table
 * @deprecated
 */
function TableX<D extends object = {}>({
  columns,
  data,
  loading,
  keyField = 'value',
  tiled,
  border,
  headerSortMultiple,
  tableRef,
  isTrHighlight,
  isTrDisable,
  onScroll,
  SubComponent,
  onHeadersSort,
  className,
  ...rest
}: TableXProps<D>) {
  const {
    rows,
    headerGroups,
    totalWidth,
    sorts,
    getTableProps,
    getTableBodyProps,
    prepareRow,
    onHeaderSort,
  } = useInitTable({ columns, data, headerSortMultiple, onHeadersSort })

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

  useImperativeHandle(
    tableRef,
    () => ({
      getDiyShowMap: () => {
        const diyShowMaap = getDiyShowMap(columns as TableXColumn<any>[])
        return diyShowMaap
      },
    }),
    [columns]
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
