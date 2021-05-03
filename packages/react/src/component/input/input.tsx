import React, { forwardRef, InputHTMLAttributes } from 'react'
import classNames from 'classnames'

type InputProps = InputHTMLAttributes<HTMLInputElement>

/** 没什么，就一个input，多了个类名 gm-input 用来和库配合做UI */
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, value = '', ...rest } = props
  return (
    <input
      ref={ref}
      {...rest}
      value={value}
      className={classNames('gm-input', className)}
    />
  )
})

export default Input
export type { InputProps }
