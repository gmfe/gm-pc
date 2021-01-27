/*
 * @Description: 表身每一行
 */
import React from 'react'

import Td from './td'

import { ISimpleRowProps, ICellProps } from './types'

function Row<OriginalType>(props: ISimpleRowProps<OriginalType>) {
  const { rowIndex, original, columns } = props
  return (
    <tr>
      {columns.map((column) => {
        const { id, align, getColSpan, getRowSpan, Cell } = column

        const text = original[id]
        const key = id + rowIndex
        const colSpan = getColSpan && getColSpan(rowIndex)
        const rowSpan = getRowSpan && getRowSpan(rowIndex)

        const cellProps: ICellProps<OriginalType> = { text, original, rowIndex }
        const children = Cell ? Cell(cellProps) : text
        return (
          <Td key={key} align={align} colSpan={colSpan} rowSpan={rowSpan}>
            {children}
          </Td>
        )
      })}
    </tr>
  )
}

export default Row
