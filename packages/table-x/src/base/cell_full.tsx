import React, { FC } from 'react'

const TableXCellFull: FC = ({ children }) => {
  return <div className='gm-table-x-cell-full'>{children}</div>
}

const TableXCellFullItem: FC = ({ children }) => {
  return <div className='gm-table-x-cell-full-item'>{children}</div>
}

export { TableXCellFull, TableXCellFullItem }
