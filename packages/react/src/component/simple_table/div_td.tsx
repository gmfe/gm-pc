/*
 * @Description: 基于div模拟的td，主要用于summaryRow
 */

import React, { FC } from 'react'

import { ISimpleDivTdProps } from './types'

const DivTd: FC<ISimpleDivTdProps> = (props) => {
  const { align = 'center', width, children } = props

  return <div style={{ width, textAlign: align }}>{children}</div>
}

export default DivTd
