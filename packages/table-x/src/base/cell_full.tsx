import React, { FC, CSSProperties } from 'react'

const TableXCellFull: FC = ({ children }) => {
  return <div className='gm-table-x-cell-full'>{children}</div>
}
interface TableXCellFullItemProps {
  style: CSSProperties
}

const TableXCellFullItem: FC<TableXCellFullItemProps> = ({ children, style }) => {
  return (
    <div className='gm-table-x-cell-full-item' style={style}>
      {children}
    </div>
  )
}

export { TableXCellFull, TableXCellFullItem }
