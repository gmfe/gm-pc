import React, {
  FC,
  HTMLAttributes,
  TableHTMLAttributes,
  UIEvent,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'
import classNames from 'classnames'
import { Align, ReactElementType, VariableSizeList } from 'react-window'

import Thead from '../base/thead'
import RenderRow from './render_row'
import LoadingAndEmpty from './loading_and_empty'

import { useInitTable, afterScroll, getDiyShowMap, getVirtualizedParams } from '../utils'
import { TableXHeaderGroup, TableXRow } from '../base/types'
import { Column, TableProps } from './types'
import { ConfigContext } from '@gm-pc/react'

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
  trHighlightClass,
  isTrDisable,
  onScroll,
  onRowClick,
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
  const { fontSize } = useContext(ConfigContext)
  const virtualizedRef = useRef<VariableSizeList>(null)
  const tableWrapperRef = useRef<HTMLDivElement>(null)

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

  useImperativeHandle(refVirtualized, () => virtualizedRef.current)
  useImperativeHandle(
    tableRef,
    () => ({
      getDiyShowMap: () => {
        const diyShowMaap = getDiyShowMap(columns as Column<any>[])
        return diyShowMaap
      },
      scrollToItem: (index: number, align?: Align) => {
        if (isVirtualized) {
          // eslint-disable-next-line no-unused-expressions
          virtualizedRef.current?.scrollToItem(index, align)
          return
        }
        if (!tableWrapperRef.current) return

        const tableWrapper = tableWrapperRef.current
        const tableBody = tableWrapper.querySelector('tbody')
        if (!tableBody) return

        const targetRow = tableBody.children[index]
        if (!targetRow) return

        const rowCount = tableBody.children.length
        if (index < 0 || index >= rowCount) {
          console.warn(`超出范围：${index}`)
          return
        }

        const tableHeight = tableWrapper.offsetHeight
        // 获取 thead 的高度
        const theadHeight = tableWrapper.querySelector('thead')?.offsetHeight || 0
        const tableRect = tableWrapper.getBoundingClientRect()
        const rowRect = targetRow.getBoundingClientRect()
        const rowHeight = targetRow.clientHeight

        const visibleHeight = tableHeight - theadHeight
        console.log(visibleHeight)

        let scrollTop
        switch (align) {
          case 'start':
            scrollTop = rowRect.top - tableRect.top - theadHeight
            break
          case 'center':
            scrollTop = rowRect.top - tableRect.top - (visibleHeight - rowHeight) / 2
            break
          case 'end':
            scrollTop = rowRect.top - tableRect.top - tableHeight + rowHeight
            break
          case 'smart':
            // 在一个屏幕内，则不做处理
            if (
              rowRect.top >= tableRect.top + theadHeight &&
              rowRect.bottom <= tableRect.bottom
            ) {
              return
            } else if (
              Math.abs(rowRect.top - (tableRect.top + theadHeight)) < visibleHeight &&
              Math.abs(rowRect.bottom - tableRect.bottom) < visibleHeight
            ) {
              if (rowRect.top < tableRect.top + theadHeight) {
                scrollTop = rowRect.top - tableRect.top - theadHeight
              } else {
                scrollTop = rowRect.top - tableRect.top - tableHeight + rowHeight
              }
            } else {
              // Item is more than one viewport away, center it
              scrollTop = rowRect.top - tableRect.top - (visibleHeight - rowHeight) / 2
            }
            break
          default:
            // 'auto'
            if (rowRect.top < tableRect.top + theadHeight) {
              scrollTop = rowRect.top - tableRect.top - theadHeight
            } else if (rowRect.bottom > tableRect.bottom) {
              scrollTop = rowRect.top - tableRect.top - tableHeight + rowHeight
            }
            break
        }

        if (scrollTop !== undefined) {
          tableWrapper.scrollTop += scrollTop
        }
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
    trHighlightClass,
    onRowClick,
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
          [`gm-table-x-text-${fontSize}`]: fontSize,
        },
        className
      )}
      ref={tableWrapperRef}
      onScroll={handleScroll}
    >
      {isVirtualized ? (
        <VariableSizeList
          ref={virtualizedRef}
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
