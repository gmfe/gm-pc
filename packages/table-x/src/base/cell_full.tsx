import React, { FC } from 'react'
import classNames from 'classnames'

const TableXCellFull: FC = ({ children }) => {
  return <div className='gm-table-x-cell-full'>{children}</div>
}

interface CellFulItemProps {
  item: number
  total: number
}

const TableXCellFullItem: FC<CellFulItemProps> = (props) => {
  const { item, total, children } = props
  return (
    <div
      className={classNames('gm-table-x-cell-full-item', {
        'gm-border-bottom': item !== total - 1,
      })}
    >
      {children}
    </div>
  )
}

export { TableXCellFull, TableXCellFullItem }
