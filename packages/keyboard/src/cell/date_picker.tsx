import React, { FC, useRef, KeyboardEvent } from 'react'
import { DatePicker, DatePickerProps } from '@gm-pc/react'
import { findDOMNode } from 'react-dom'

import KeyboardCell from '../core/cell'
import { scrollIntoViewFixedWidth, useContextData } from '../utils'
import { KeyboardWrapData } from '../types'

const KCDatePicker: FC<DatePickerProps> = ({ disabled, onKeyDown, ...rest }) => {
  const cellRef = useRef<KeyboardCell>(null)
  const targetRef = useRef<DatePicker>(null)
  const { wrapData, cellKey } = useContextData()

  const handleScroll = (fixedWidths: KeyboardWrapData['fixedWidths']) => {
    scrollIntoViewFixedWidth(findDOMNode(targetRef.current) as HTMLElement, fixedWidths)
  }

  const handleFocus = () => {
    if (targetRef.current) {
      targetRef.current.apiDoFocus()
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    onKeyDown && onKeyDown(event)
    if (
      event.key === 'ArrowUp' ||
      event.key === 'ArrowDown' ||
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight'
    ) {
      // 需要阻止。
      // 如果下一个是input，切过去的时候光标会右移一位是 keydown
      event.preventDefault()
      // eslint-disable-next-line
      cellRef.current?.apiDoDirectionByEventKey(event.key)
    } else if (event.key === 'Tab') {
      // 要阻止默认的
      event.preventDefault()
      // eslint-disable-next-line
      cellRef.current?.apiDoTab()
    } else if (event.key === 'Enter') {
      // 要阻止默认的
      event.preventDefault()
      // enter 要选择
      // eslint-disable-next-line
      targetRef.current?.apiDoSelectWillActive()
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
      <DatePicker
        disabled={disabled}
        {...rest}
        popoverType='realFocus'
        onKeyDown={handleKeyDown}
        ref={targetRef}
      />
    </KeyboardCell>
  )
}

export default KCDatePicker
