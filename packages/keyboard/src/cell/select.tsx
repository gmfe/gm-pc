import React, { useRef, KeyboardEvent } from 'react'
import { Select, SelectProps } from '@gm-pc/react'
import { findDOMNode } from 'react-dom'

import KeyboardCell from '../core/cell'
import { scrollIntoViewFixedWidth, useContextData } from '../utils'
import { KeyboardWrapData } from '../types'

function KCSelect({ disabled, onKeyDown, ...rest }: SelectProps) {
  const cellRef = useRef<KeyboardCell>(null)
  const targetRef = useRef<Select>(null)
  const { wrapData, cellKey } = useContextData()

  const handleFocus = () => {
    // eslint-disable-next-line
    targetRef.current?.apiDoFocus()
  }

  const handleScroll = (fixedWidths: KeyboardWrapData['fixedWidths']) => {
    scrollIntoViewFixedWidth(findDOMNode(targetRef.current!) as HTMLElement, fixedWidths)
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    onKeyDown && onKeyDown(event)
    if (
      event.key === 'ArrowUp' ||
      event.key === 'ArrowRight' ||
      event.key === 'ArrowDown' ||
      event.key === 'ArrowLeft'
    ) {
      // 需要阻止
      // 如果下一个是 input，切过去的时候光标会右移一位
      event.preventDefault()
      // eslint-disable-next-line
      cellRef.current?.apiDoDirectionByEventKey(event.key)
    } else if (event.key === 'Tab') {
      event.preventDefault()
      // eslint-disable-next-line
      cellRef.current?.apiDoTab()
    } else if (event.key === 'Enter') {
      event.preventDefault()
      // Enter 要选择
      // eslint-disable-next-line
      targetRef.current?.apiDoSelectWillActive()
      // eslint-disable-next-line
      cellRef.current?.apiDoEnter()
    }
  }

  return (
    <KeyboardCell
      ref={cellRef}
      wrapData={wrapData}
      cellKey={cellKey}
      disabled={disabled}
      onFocus={handleFocus}
      onScroll={handleScroll}
    >
      <Select
        {...rest}
        ref={targetRef}
        popoverType='realFocus'
        disabled={disabled}
        onKeyDown={handleKeyDown}
      />
    </KeyboardCell>
  )
}

export default KCSelect
