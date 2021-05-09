import React, { ComponentType, FC } from 'react'
import { TableXProps, TableXPropsType } from '../../base'
/**
 * 没什么作用，请使用Table
 * @deprecated
 */
function fixedColumnsTableXHOC<Props extends TableXProps = TableXProps>(
  Table: ComponentType<Props>
) {
  const FixedColumnsTableX: FC<TableXPropsType> = (props) => (
    <Table {...(props as Props)} />
  )
  return FixedColumnsTableX
}

export default fixedColumnsTableXHOC
