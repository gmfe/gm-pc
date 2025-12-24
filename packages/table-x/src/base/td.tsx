import React, { FC, useContext, useMemo } from 'react'
import classNames from 'classnames'
import { getColumnStyle } from '../utils'
import { TableXTdProps } from './types'
import Catch from '../utils/catch'
import { TableReSize, TableResizeProps } from '../table/base_table'
import './td.less'
const Td: FC<TableXTdProps> = ({ cell, totalWidth, rowKey, totalLeft }) => {
  const tableResize = useContext(TableReSize) as TableResizeProps
  const cp = cell.getCellProps()
  const tdProps = {
    ...cp,
    className: classNames('gm-table-x-td', `gm-table-x-column-${cell.column.index}`, {
      'gm-table-x-fixed-left': cell.column.fixed === 'left',
      'gm-table-x-fixed-right': cell.column.fixed === 'right',
    }),
    style: {
      ...cp.style,
      ...getColumnStyle(cell.column),
      width: tableResize?.widthList?.[rowKey] || getColumnStyle(cell.column).width,
      maxWidth: tableResize?.widthList?.[rowKey] || getColumnStyle(cell.column).maxWidth,
    },
  }

  if (cell.column.fixed === 'left') {
    // 用到 fixed，可以利用 totalLeft
    tdProps.style.left = totalLeft || cell.column.totalLeft
  } else if (cell.column.fixed === 'right') {
    tdProps.style.right = totalWidth - cell.column.totalLeft - cell.column.totalWidth
  }

  const {
    value,
    row,
    column: { Cell },
    row: { index, original },
  } = cell
  return (
    <td {...tdProps}>
      <div
        className={classNames('gm-td-cell', {
          'gm-td-cell-fixed': !cell.column.fixed,
        })}
      >
        <Catch>
          {Cell!({
            value,
            row,
            index,
            original,
          })}
        </Catch>
      </div>
    </td>
  )
}

export default React.memo(Td)
