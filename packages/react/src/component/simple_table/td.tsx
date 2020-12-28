import React, { FC } from 'react'

import { ISimpleTdProps } from './types'

const Td: FC<ISimpleTdProps> = (props) => {
  const { align = 'center', colSpan, rowSpan, width, children } = props

  if ([colSpan, rowSpan].includes(0)) {
    return null
  }
  return (
    <td align={align} colSpan={colSpan} rowSpan={rowSpan} width={width}>
      {children}
    </td>
  )
}

export default Td
