/*
 * @Description: 表格头部
 */
import React from 'react'

import { ISimpleTheadProps } from './types'

function Thead<OriginalType>(props: ISimpleTheadProps<OriginalType>) {
  const { columns } = props

  return (
    <thead>
      <tr>
        {columns.map((column) => {
          const { id, Header, width, height, headerSpan } = column
          if (headerSpan === 0) {
            return null
          }
          return (
            <th style={{ width, height }} colSpan={headerSpan} key={id}>
              {Header}
            </th>
          )
        })}
      </tr>
    </thead>
  )
}

export default Thead
