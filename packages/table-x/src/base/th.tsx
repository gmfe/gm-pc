import React, { FC, ThHTMLAttributes } from 'react'
import classNames from 'classnames'
import { TableXThProps } from './types'
import { getColumnStyle } from '../utils'
import { TableComponents } from '../table'

interface ThProps extends TableXThProps {
  sortDirection?: 'desc' | 'asc' | null
  components?: TableComponents
}
const Th: FC<ThProps> = ({ components, column, totalWidth }) => {
  const hp = column.getHeaderProps()

  const thProps: ThHTMLAttributes<HTMLTableHeaderCellElement> = {
    ...hp,
    className: classNames(
      'gm-table-x-th',
      `gm-table-x-column-${column.index}`,
      hp.className,
      {
        'gm-table-x-fixed-left': column.fixed === 'left',
        'gm-table-x-fixed-right': column.fixed === 'right',
      }
    ),
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

  return components?.header?.cell ? (
    <components.header.cell {...thProps} {...(column?.onHeaderCell?.(column) || {})}>
      {column.render('Header')}
    </components.header.cell>
  ) : (
    <th {...thProps}>{column.render('Header')}</th>
  )
}

export default React.memo(Th)
