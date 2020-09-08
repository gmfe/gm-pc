import React, { ComponentType, FC } from 'react'
import classNames from 'classnames'
import { TableXPropsType } from '../../base'

function editTableXHOC(Table: ComponentType<TableXPropsType>) {
  const EditTableX: FC<TableXPropsType> = ({ className, ...rest }) => (
    <Table {...rest} className={classNames('gm-table-x-edit-table', className)} />
  )
  return EditTableX
}

export default editTableXHOC
