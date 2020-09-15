import React, { ChangeEvent, forwardRef, InputHTMLAttributes, useRef } from 'react'
import classNames from 'classnames'
import SVGCloseCircle from '../../svg/close-circle.svg'
import { findDOMNode } from 'react-dom'
import Input, { InputProps } from './input'

interface InputCloseProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?(value: string): void
}

const InputClose = forwardRef<HTMLInputElement, InputCloseProps>((props, ref) => {
  const { value, onChange, disabled, className, style, ...rest } = props

  const refWrap = useRef<HTMLDivElement>(null)

  const handleClose = () => {
    onChange && onChange('')
    const dom = findDOMNode(refWrap.current) as Element
    if (dom) {
      const input = dom.querySelector('input')
      if (input) {
        input.focus()
      }
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e.target.value)
  }

  return (
    <div
      ref={refWrap}
      className={classNames('gm-input-close', className, { disabled })}
      style={style}
    >
      <Input
        ref={ref}
        {...(rest as InputProps)}
        value={value}
        onChange={handleChange}
        disabled={disabled}
      />
      {value && <SVGCloseCircle onClick={handleClose} className='gm-input-close-icon' />}
    </div>
  )
})

export default InputClose
export type { InputCloseProps }
