import React, { FC, useContext, memo } from 'react'
import classNames from 'classnames'
import Td from './td'
import { TableXTrProps } from './types'
import _ from 'lodash'
import SelectTableXContext from '../hoc/select_table_x/context'

const Tr: FC<TableXTrProps> = ({
  row,
  SubComponent,
  keyField,
  style,
  totalWidth,
  isTrDisable = _.noop,
  isTrHighlight = _.noop,
}) => {
  const { onRowSelect } = useContext(SelectTableXContext)
  // 目前是为了 sortable 用。值可能是 undefined，keyField 没作用的情况
  const trId = row.original[keyField]
  const props = {
    onClick: () => onRowSelect(trId),
    ...row.getRowProps(),
    style,
    className: classNames('gm-table-x-tr', {
      'gm-table-x-tr-disable': isTrDisable(row.original, row.index),
      'gm-table-x-tr-highlight': isTrHighlight(row.original, row.index),
      'gm-table-x-tr-odd': row.index % 2 === 0,
      'gm-table-x-tr-even': row.index % 2 !== 0,
    }),
  }

  return (
    <>
      {/* @ts-ignore */}
      <tr {...props} data-id={trId}>
        {row.cells.map((cell, index) => (
          <Td key={index} totalWidth={totalWidth} cell={cell} />
        ))}
      </tr>
      {SubComponent && SubComponent(row)}
    </>
  )
}

export default memo(Tr)
