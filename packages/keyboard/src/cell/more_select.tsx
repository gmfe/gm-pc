import React, { useRef, KeyboardEvent, forwardRef, useImperativeHandle } from 'react'
import { MoreSelect, MoreSelectProps } from '@gm-pc/react'
import { findDOMNode } from 'react-dom'

import KeyboardCell from '../core/cell'
import { isInputUnBoundary, scrollIntoViewFixedWidth, useContextData } from '../utils'
import { KeyboardWrapData, MoreSelectRef } from '../types'

function KCMoreSelect<V>(
  { disabled, onKeyDown, ...rest }: MoreSelectProps<V>,
  ref: React.ForwardedRef<MoreSelectRef>
) {
  const cellRef = useRef<KeyboardCell>(null)
  const targetRef = useRef<MoreSelect>(null)
  const { wrapData, cellKey } = useContextData()

  useImperativeHandle(ref, () => {
    return {
      handleInitSearch,
    }
  })

  const handleFocus = () => {
    // eslint-disable-next-line
    targetRef.current?.apiDoFocus()
  }

  const handleScroll = (fixedWidths: KeyboardWrapData['fixedWidths']) => {
    scrollIntoViewFixedWidth(findDOMNode(targetRef.current!) as HTMLElement, fixedWidths)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    onKeyDown && onKeyDown(event)
    if (isInputUnBoundary(event)) return
    if (
      event.key === 'ArrowUp' ||
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight' ||
      event.key === 'ArrowDown'
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
      targetRef.current?.apiDoSelectWillActive()
      // eslint-disable-next-line
      cellRef.current?.apiDoEnter()
    }
  }

  const handleInitSearch = (q?: string) => {
    // eslint-disable-next-line no-unused-expressions
    targetRef.current?._handleInitSearch(q)
  }

  return (
    <KeyboardCell
      ref={cellRef}
      disabled={disabled}
      wrapData={wrapData}
      cellKey={cellKey}
      onFocus={handleFocus}
      onScroll={handleScroll}
    >
      <MoreSelect<V>
        {...rest}
        disabled={disabled}
        ref={targetRef}
        popoverType='realFocus'
        onKeyDown={handleKeyDown}
        isKeyboard
      />
    </KeyboardCell>
  )
}

export default forwardRef(KCMoreSelect)
