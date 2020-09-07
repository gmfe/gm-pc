import React, { FC, ThHTMLAttributes } from 'react'
import classNames from 'classnames'
import { TableXThProps } from './types'
import { getColumnStyle } from '../utils'

const Th: FC<TableXThProps> = ({ column, totalWidth }) => {
  const hp = column.getHeaderProps()

  const thProps: ThHTMLAttributes<HTMLTableHeaderCellElement> = {
    ...hp,
    className: classNames('gm-table-x-th', hp.className, {
      'gm-table-x-fixed-left': column.fixed === 'left',
      'gm-table-x-fixed-right': column.fixed === 'right',
    }),
    style: {
      ...hp.style,
      ...getColumnStyle(column),
    },
  }

  if (column.fixed === 'left') {
    thProps.style!.left = column.totalLeft
  } else if (column.fixed === 'right') {
    thProps.style!.right = totalWidth - column.totalLeft - column.totalWidth
  }

  return <th {...thProps}>{column.render('Header')}</th>
}

export default React.memo(Th)
