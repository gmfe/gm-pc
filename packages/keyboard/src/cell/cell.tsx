import React, { FC } from 'react'
import { useContextData } from '../utils'

import KeyboardCell from '../core/cell'
import { KeyboardCellProps } from '../types'

const KC: FC<Pick<KeyboardCellProps, 'onFocus' | 'onScroll' | 'disabled'>> = ({
  onFocus,
  onScroll,
  disabled,
  children,
}) => {
  const { wrapData, cellKey } = useContextData()
  return (
    <KeyboardCell
      wrapData={wrapData}
      cellKey={cellKey}
      disabled={disabled}
      onScroll={onScroll}
      onFocus={onFocus}
    >
      {children}
    </KeyboardCell>
  )
}

export default KC
