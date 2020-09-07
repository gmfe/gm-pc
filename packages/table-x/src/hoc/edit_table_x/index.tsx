import React, { ComponentType, FC } from 'react'
import classNames from 'classnames'
import { TableXProps, TableXVirtualizedProps } from '../../base'

function editTableXHOC(Table: ComponentType<TableXProps | TableXVirtualizedProps>) {
  const EditTableX: FC<TableXProps> = ({ className, ...rest }) => (
    <Table {...rest} className={classNames('gm-table-x-edit-table', className)} />
  )
  return EditTableX
}

export default editTableXHOC
