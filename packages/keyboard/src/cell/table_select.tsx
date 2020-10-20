import React, { useRef, KeyboardEvent } from 'react'
import { MoreSelect, TableSelect, TableSelectProps } from '@gm-pc/react'
import { findDOMNode } from 'react-dom'

import KeyboardCell from '../core/cell'
import { isInputUnBoundary, scrollIntoViewFixedWidth, useContextData } from '../utils'
import { KeyboardWrapData } from '../types'

function KCTableSelect<V = any>({ disabled, onKeyDown, ...rest }: TableSelectProps<V>) {
  const cellRef = useRef<KeyboardCell>(null)
  const targetRef = useRef<MoreSelect>(null)
  const { wrapData, cellKey } = useContextData()

  const handleScroll = (fixedWidths: KeyboardWrapData['fixedWidths']) => {
    scrollIntoViewFixedWidth(findDOMNode(targetRef.current!) as HTMLElement, fixedWidths)
  }

  const handleFocus = () => {
    // eslint-disable-next-line
    targetRef.current?.apiDoFocus()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    onKeyDown && onKeyDown(event)
    if (isInputUnBoundary(event)) return

    if (
      event.key === 'ArrowUp' ||
      event.key === 'ArrowDown' ||
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight'
    ) {
      event.preventDefault()
      // eslint-disable-next-line
      cellRef.current?.apiDoDirectionByEventKey(event.key)
    } else if (event.key === 'Tab') {
      event.preventDefault()
      // eslint-disable-next-line
      cellRef.current?.apiDoTab()
    } else if (event.key === 'Enter') {
      event.preventDefault()
      // eslint-disable-next-line
      cellRef.current?.apiDoEnter()
    }
  }

  return (
    <KeyboardCell
      disabled={disabled}
      ref={cellRef}
      wrapData={wrapData}
      cellKey={cellKey}
      onFocus={handleFocus}
      onScroll={handleScroll}
    >
      <TableSelect
        {...(rest as any)}
        ref={targetRef}
        popoverType='realFocus'
        onKeyDown={handleKeyDown}
        isKeyboard
        disabled={disabled}
      />
    </KeyboardCell>
  )
}

export default KCTableSelect
