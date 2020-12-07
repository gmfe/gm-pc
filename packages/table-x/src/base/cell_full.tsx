import classNames from 'classnames'
import React, { FC, HTMLAttributes } from 'react'

const TableXCellFull: FC = ({ children }) => {
  return <div className='gm-table-x-cell-full'>{children}</div>
}

const TableXCellFullItem: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div {...rest} className={classNames('gm-table-x-cell-full-item', className)}>
      {children}
    </div>
  )
}

export { TableXCellFull, TableXCellFullItem }
