import React, { ComponentType, FC } from 'react'
import { TableXPropsType } from '../../base'

function fixedColumnsTableXHOC(Table: ComponentType<TableXPropsType>) {
  const FixedColumnsTableX: FC<TableXPropsType> = (props) => <Table {...props} />
  return FixedColumnsTableX
}

export default fixedColumnsTableXHOC
