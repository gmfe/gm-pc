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
  components,
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
  const { onRowSelect, selected } = useContext(SelectTableXContext)
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
      tableResize?.widthList
    )
    return leftFixSum
  }, [row.cells, tableResize?.widthList])

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
      'gm-table-x-tr-selected': selected?.includes(trId),
    }),
  }
  // 使用 useMemo 缓存子元素，避免每次重新创建
  const children = useMemo(
    () =>
      row.cells.map((cell) => (
        <Td
          rowKey={cell.column.id}
          key={cell.column.id}
          totalWidth={totalWidth}
          cell={cell}
          totalLeft={memoSize[cell.column.id]}
        />
      )),
    [row.cells, totalWidth, memoSize]
  )

  // 提取公共 props，避免重复
  const trProps = {
    ...props,
    'data-id': trId,
    'data-index': row.index,
  }

  // 选择组件类型，避免条件渲染中的重复代码
  const TrComponent = components?.body?.row || 'tr'

  return (
    <>
      <TrComponent {...trProps}>{children}</TrComponent>
      {SubComponent?.(row)}
    </>
  )
}

export default memo(Tr)
