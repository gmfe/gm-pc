import React, {
  HTMLAttributes,
  TableHTMLAttributes,
  CSSProperties,
  FC,
  UIEvent,
} from 'react'
import classNames from 'classnames'
import { useInitTable, afterScroll } from '../utils'
import { Empty, Loading } from '../components'
import Thead from './thead'
import Tr from './tr'
import { TableXProps } from './types'

const TableX: FC<TableXProps> = ({
  columns,
  data,
  loading,
  SubComponent,
  keyField = 'value',
  tiled,
  isTrHighlight,
  isTrDisable,
  onScroll,
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
        row={row}
        SubComponent={SubComponent}
        keyField={keyField}
        style={style}
        totalWidth={totalWidth}
        isTrHighlight={isTrHighlight}
        isTrDisable={isTrDisable}
      />
    )
  }

  return (
    <div
      {...rest}
      className={classNames(
        'gm-table-x',
        {
          'gm-table-x-empty': data.length === 0,
          'gm-table-x-tiled': tiled,
        },
        className
      )}
      onScroll={handleScroll}
    >
      <table {...tableProps}>
        <Thead headerGroups={headerGroups} totalWidth={totalWidth} />
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
