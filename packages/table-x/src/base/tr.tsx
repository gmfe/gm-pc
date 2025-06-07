import React, { FC, useContext, memo, useMemo } from 'react'
import classNames from 'classnames'
import Td from './td'
import { TableXTrProps } from './types'
import _ from 'lodash'
import SelectTableXContext from '../hoc/select_table_x/context'
import { useHighlightTableXContext } from '../hoc/highlight_table_x/context'
import { TableReSize, TableResizeProps } from '../table/base_table'
import { getColumnFixedWidth } from '../utils/get_column_style'

const DEFAULT_HIGHLIGHT_CLASS = 'gm-table-x-tr-highlight'

const Tr: FC<TableXTrProps> = ({
  row,
  SubComponent,
  keyField,
  style,
  totalWidth,
  isTrDisable = _.noop,
  isTrHighlight = _.noop,
  trHighlightClass = DEFAULT_HIGHLIGHT_CLASS,
  onRowClick,
}) => {
  const tableResize = useContext(TableReSize) as TableResizeProps

  const { highlight } = useHighlightTableXContext()
  const { onRowSelect } = useContext(SelectTableXContext)
  // 目前是为了 sortable 用。值可能是 undefined，keyField 没作用的情况
  const trId = row.original[keyField]
  const highlightClass = _.isFunction(trHighlightClass)
    ? trHighlightClass(row.original, row.index) || DEFAULT_HIGHLIGHT_CLASS
    : trHighlightClass

  const memoSize = useMemo(() => {
    const { leftFixSum } = getColumnFixedWidth(
      row.cells.map((_item) => {
        return _item.column
      }) as any,
      tableResize.widthList
    )
    return leftFixSum
  }, [row.cells, tableResize.widthList])

  const props = {
    onClick: (e: Event) => {
      onRowClick && onRowClick(e)
      onRowSelect(trId, row.index)
    },
    ...row.getRowProps(),
    style,
    className: classNames('gm-table-x-tr', {
      'gm-table-x-tr-disable': isTrDisable(row.original, row.index),
      [highlightClass]: isTrHighlight(row.original, row.index),
      'gm-table-x-tr-odd': row.index % 2 === 0,
      'gm-table-x-tr-even': row.index % 2 !== 0,
      'gm-table-x-tr-current': row.index === highlight,
    }),
  }
  return (
    <>
      {/* @ts-ignore */}
      <tr {...props} data-id={trId} data-index={row.index}>
        {row.cells.map((cell, index) => (
          <Td
            rowKey={cell.column.id}
            key={index}
            totalWidth={totalWidth}
            cell={cell}
            totalLeft={memoSize[cell.column.id]}
          />
        ))}
      </tr>
      {SubComponent && SubComponent(row)}
    </>
  )
}

export default memo(Tr)
