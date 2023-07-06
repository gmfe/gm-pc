import React, { forwardRef, TextareaHTMLAttributes, useContext } from 'react'
import classNames from 'classnames'
import { ConfigContext } from '../config_provider'

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const { fontSize } = useContext(ConfigContext)
  const { className, ...rest } = props
  return (
    <textarea
      ref={ref}
      {...rest}
      className={classNames('gm-textarea', className, {
        [`gm-textarea-text-${fontSize}`]: fontSize,
      })}
    />
  )
})

export default TextArea
export type { TextAreaProps }
