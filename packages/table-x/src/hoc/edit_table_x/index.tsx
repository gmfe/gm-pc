import React, { ComponentType, FC } from 'react'
import classNames from 'classnames'
import { TableXProps } from '../../base'
/**
 * 请使用Table并配置isEdit
 * @deprecated
 */
function editTableXHOC<Props extends TableXProps = TableXProps>(
  Table: ComponentType<Props>
) {
  const EditTableX: FC<Props> = ({ className, ...rest }) => (
    <Table
      {...(rest as Props)}
      className={classNames('gm-table-x-edit-table', className)}
    />
  )
  return EditTableX
}

export default editTableXHOC
