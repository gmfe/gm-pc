import React, { FC } from 'react'
import classNames from 'classnames'
import { getColumnStyle } from '../utils'
import { TableXTdProps } from './types'
import Catch from '../utils/catch'

const Td: FC<TableXTdProps> = ({ cell, totalWidth }) => {
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
    },
  }

  if (cell.column.fixed === 'left') {
    // 用到 fixed，可以利用 totalLeft
    tdProps.style.left = cell.column.totalLeft
  } else if (cell.column.fixed === 'right') {
    tdProps.style.right = totalWidth - cell.column.totalLeft - cell.column.totalWidth
  }

  const {
    column: { Cell, index },
    value,
    row,
  } = cell
  return (
    <td {...tdProps}>
      <Catch>
        {Cell!({
          value,
          row,
          index,
          original: row.original,
        })}
      </Catch>
    </td>
  )
}

export default React.memo(Td)
