import React, { FC, useRef, FocusEvent, KeyboardEvent } from 'react'
import { AutoComplete, AutoCompleteRef, AutoCompleteProps } from '@gm-pc/react'

import KeyboardCell from '../core/cell'
import { isInputUnBoundary, scrollIntoViewFixedWidth, useContextData } from '../utils'
import { KeyboardWrapData } from '../types'

const KCAutoComplete: FC<AutoCompleteProps> = (props) => {
  const { onFocus, onKeyDown, disabled, ...rest } = props

  const cellRef = useRef<KeyboardCell>(null)
  const autoCompleteRef = useRef<AutoCompleteRef>(null)
  const { wrapData, cellKey } = useContextData()

  const handleFocus = () => {
    // eslint-disable-next-line
    autoCompleteRef.current?.input?.focus()
    // eslint-disable-next-line
    autoCompleteRef.current?.triggerPopover(true)
  }

  const handleInputFocus = (event: FocusEvent<HTMLInputElement>) => {
    if (onFocus) {
      onFocus(event)
      return
    }
    event.target && event.target.select()
  }

  const handleScroll = (fixedWidths: KeyboardWrapData['fixedWidths']) => {
    scrollIntoViewFixedWidth(autoCompleteRef.current!.input!, fixedWidths)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown && onKeyDown(event)
    if (isInputUnBoundary(event)) return
    if (
      event.key === 'ArrowUp' ||
      event.key === 'ArrowRight' ||
      event.key === 'ArrowDown' ||
      event.key === 'ArrowLeft'
    ) {
      // 需要阻止
      // 如果下一个是 input，切换过去的时候光标会右移一位
      event.preventDefault()
      // eslint-disable-next-line
      cellRef.current?.apiDoDirectionByEventKey(event.key)
    } else if (event.key === 'Tab') {
      // 要阻止默认
      // eslint-disable-next-line
      cellRef.current?.apiDoTab()
    } else if (event.key === 'Enter') {
      // 要阻止默认
      event.preventDefault()
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
      onScroll={handleScroll}
      onFocus={handleFocus}
    >
      <AutoComplete
        ref={autoCompleteRef}
        {...rest}
        onFocus={handleInputFocus}
        disabled={disabled}
        onKeyDown={handleKeyDown}
      />
    </KeyboardCell>
  )
}

export default KCAutoComplete
