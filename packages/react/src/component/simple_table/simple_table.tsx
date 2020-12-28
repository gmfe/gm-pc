/*
 * @Description: 基于原生封装的表格
 */

import React from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import Thead from './thead'
import Tbody from './tbody'

import { ISimpleTableProps } from './types'

function SimpleTable<originalType>(props: ISimpleTableProps<originalType>) {
  const {
    rowKey,
    columns,
    data,
    className,
    style,
    bordered = true,
    rowSummary,
    allSummary,
    ...restProps
  } = props
  return (
    <table
      {...restProps}
      className={classNames(
        'gm-simple-table',
        bordered ? '' : 'gm-simple-table-no-border',
        className
      )}
      style={{
        ...style,
      }}
    >
      <Thead columns={columns} />
      <Tbody
        rowKey={rowKey}
        columns={columns}
        data={data}
        rowSummary={rowSummary}
        allSummary={allSummary}
      />
    </table>
  )
}
SimpleTable.defaultProps = {
  rowKey: '',
  columns: [],
  data: [],
  className: '',
  style: {},
  bordered: true,
}

export default SimpleTable
