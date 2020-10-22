import React, { FC } from 'react'
import { useContextData } from '../utils'

import KeyboardCell from '../core/cell'

const KCDisabled: FC = ({ children }) => {
  const { wrapData, cellKey } = useContextData()
  const handleVoid = () => {}
  return (
    <KeyboardCell
      wrapData={wrapData}
      cellKey={cellKey}
      disabled
      onScroll={handleVoid}
      onFocus={handleVoid}
    >
      {children}
    </KeyboardCell>
  )
}

export default KCDisabled
