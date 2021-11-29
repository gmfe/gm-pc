import React, {
  FC,
  HTMLAttributes,
  TableHTMLAttributes,
  UIEvent,
  useImperativeHandle,
  useMemo,
} from 'react'
import classNames from 'classnames'
import { ReactElementType, VariableSizeList } from 'react-window'

import Thead from '../base/thead'
import RenderRow from './render_row'
import LoadingAndEmpty from './loading_and_empty'

import { useInitTable, afterScroll, getDiyShowMap, getVirtualizedParams } from '../utils'
import { TableXHeaderGroup } from '../base/types'
import { Column, TableProps } from './types'

function BaseTable<D extends object = {}>({
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

  isVirtualized,
  limit,
  virtualizedHeight,
  virtualizedItemSize,
  refVirtualized,
  fixedSelect,
  batchActions,
  ...rest
}: TableProps<D>) {
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
    style: { minWidth: totalWidth },
    className: classNames('gm-table-x-table', gtp.className),
  }

  const handleScroll = (event: UIEvent<HTMLDivElement>): void => {
    onScroll && onScroll(event)
    afterScroll()
  }

  const TableContainer = useMemo((): ReactElementType => {
    const Table: FC<HTMLTableElement> = ({ children, style, ...rest }) => {
      // 获取body参数 start
      const gtbp = getTableBodyProps()
      const tableBodyProps: HTMLAttributes<HTMLTableSectionElement> = {
        ...gtbp,
        className: 'gm-table-x-tbody',
      }
      // 获取body参数 end
      return (
        // @ts-ignore
        <table {...rest} {...tableProps} style={{ ...style, ...tableProps.style }}>
          <Thead
            headerGroups={headerGroups as TableXHeaderGroup[]}
            totalWidth={totalWidth}
            onHeaderSort={onHeaderSort}
            sorts={sorts}
          />
          {/* @ts-ignore */}
          <tbody {...tableBodyProps}>{children}</tbody>
        </table>
      )
    }
    return Table
    // headerGroups 会因为coluns变化而变化，所以无需加入，否则会造成重复渲染
  }, [columns, totalWidth, sorts, onHeaderSort])

  useImperativeHandle(
    tableRef,
    () => ({
      getDiyShowMap: () => {
        const diyShowMaap = getDiyShowMap(columns as Column<any>[])
        return diyShowMaap
      },
    }),
    [columns]
  )
  // 列表数量
  const dataLength = data.length
  const renderRowData = {
    keyField,
    totalWidth,
    rows,
    prepareRow,
    SubComponent,
    isTrDisable,
    isTrHighlight,
  }

  // 获取虚拟列表参数 start
  const {
    itemCount,
    virtualizedHeight: newVirtualizedHeight,
    itemSize,
  } = getVirtualizedParams({
    limit,
    length: dataLength,
    virtualizedHeight,
    virtualizedItemSize,
  })
  // 获取虚拟列表参数 end
  return (
    // @ts-ignore
    <div
      {...rest}
      className={classNames(
        'gm-table-x',
        {
          'gm-table-x-empty': dataLength === 0,
          'gm-table-x-tiled': tiled,
          'gm-table-x-border': border,
        },
        className
      )}
      onScroll={handleScroll}
    >
      {isVirtualized ? (
        <VariableSizeList
          ref={refVirtualized}
          height={newVirtualizedHeight}
          itemCount={itemCount}
          innerElementType={TableContainer}
          itemData={renderRowData}
          width='100%'
          className='gm-table-x-virtualized'
          itemSize={itemSize}
        >
          {RenderRow}
        </VariableSizeList>
      ) : (
        <TableContainer>
          <RenderRow data={renderRowData} isMap />
        </TableContainer>
      )}
      <LoadingAndEmpty loading={loading} length={dataLength} />
    </div>
  )
}

export default BaseTable
