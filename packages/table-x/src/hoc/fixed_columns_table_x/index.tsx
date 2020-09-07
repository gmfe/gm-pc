import React, { ComponentType, FC } from 'react'
import { TableXProps, TableXVirtualizedProps } from '../../base'

function fixedColumnsTableXHOC(
  Table: ComponentType<TableXProps | TableXVirtualizedProps>
) {
  const FixedColumnsTableX: FC<TableXProps> = (props) => <Table {...props} />
  return FixedColumnsTableX
}

export default fixedColumnsTableXHOC
