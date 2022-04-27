import React, {
  useRef,
  FocusEvent,
  KeyboardEvent,
  useImperativeHandle,
  forwardRef,
  ForwardRefRenderFunction,
} from 'react'
import { InputNumber, InputNumberProps } from '@gm-pc/react'
import { findDOMNode } from 'react-dom'

import KeyboardCell from '../core/cell'
import { isInputUnBoundary, scrollIntoViewFixedWidth, useContextData } from '../utils'
import { KeyboardWrapData } from '../types'

interface RefFunctionProps {
  focus(): void
}

const KCInputNumber: ForwardRefRenderFunction<RefFunctionProps, InputNumberProps> = (
  { disabled, onKeyDown, onFocus, ...rest },
  ref
) => {
  const cellRef = useRef<KeyboardCell>(null)
  const targetRef = useRef<InputNumber>(null)
  const { cellKey, wrapData } = useContextData()

  const handleScroll = (fixedWidths: KeyboardWrapData['fixedWidths']) => {
    scrollIntoViewFixedWidth(findDOMNode(targetRef.current!) as HTMLElement, fixedWidths)
  }

  const handleFocus = () => {
    // eslint-disable-next-line
    targetRef.current?.apiDoFocus()
  }

  const handleInputFocus = (event: FocusEvent<HTMLInputElement>) => {
    if (onFocus) {
      onFocus(event)
      return
    }
    event.target && event.target.select()
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
  useImperativeHandle(ref, () => ({
    focus: handleFocus,
  }))

  return (
    <KeyboardCell
      ref={cellRef}
      wrapData={wrapData}
      cellKey={cellKey}
      onFocus={handleFocus}
      disabled={disabled}
      onScroll={handleScroll}
    >
      <InputNumber
        {...rest}
        onFocus={handleInputFocus}
        ref={targetRef}
        disabled={disabled}
        onKeyDown={handleKeyDown}
      />
    </KeyboardCell>
  )
}

export default forwardRef(KCInputNumber)
