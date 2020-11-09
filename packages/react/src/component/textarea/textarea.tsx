import React, { forwardRef, TextareaHTMLAttributes } from 'react'
import classNames from 'classnames'

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const { className, ...rest } = props
  return <textarea ref={ref} {...rest} className={classNames('gm-textarea', className)} />
})

export default TextArea
export type { TextAreaProps }
