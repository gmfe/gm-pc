import React, { FC, useContext } from 'react'
import classNames from 'classnames'
import { getColumnStyle } from '../utils'
import { TableXTdProps } from './types'
import Catch from '../utils/catch'
import { TableReSize, TableResizeProps } from '../table/base_table'

const Td: FC<TableXTdProps> = ({ cell, totalWidth, rowIndex }) => {
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
      width: tableResize?.widthList[rowIndex] || getColumnStyle(cell.column).width,
      maxWidth: tableResize?.widthList[rowIndex] || getColumnStyle(cell.column).maxWidth,
    },
  }

  if (cell.column.fixed === 'left') {
    // 用到 fixed，可以利用 totalLeft
    tdProps.style.left = cell.column.totalLeft
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
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
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
