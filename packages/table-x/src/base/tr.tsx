import React, { FC } from 'react'
import classNames from 'classnames'
import Td from './td'
import { TableXTrProps } from './types'
import _ from 'lodash'

const Tr: FC<TableXTrProps> = ({
  row,
  SubComponent,
  keyField,
  style,
  totalWidth,
  isTrDisable = _.noop,
  isTrHighlight = _.noop,
}) => {
  // 手动设置active态
  const props = {
    ...row.getRowProps(),
    style,
    className: classNames('gm-table-x-tr', {
      'gm-table-x-tr-disable': isTrDisable(row.original, row.index),
      'gm-table-x-tr-highlight': isTrHighlight(row.original, row.index),
      'gm-table-x-tr-odd': row.index % 2 === 0,
      'gm-table-x-tr-even': row.index % 2 !== 0,
    }),
  }

  // 目前是为了 sortable 用。值可能是 undefined，keyField 没作用的情况
  const trId = row.original[keyField]

  return (
    <>
      <tr {...props} data-id={trId}>
        {row.cells.map((cell, index) => (
          <Td key={index} totalWidth={totalWidth} cell={cell} />
        ))}
      </tr>
      {SubComponent && SubComponent(row)}
    </>
  )
}

export default React.memo(Tr)
