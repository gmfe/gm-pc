import React, { MouseEvent, FC, HTMLAttributes } from 'react'
import classNames from 'classnames'

interface ButtonTextProps extends HTMLAttributes<HTMLSpanElement> {
  type?: 'default' | 'primary' | 'success' | 'danger'
  disabled?: boolean
  onClick?(event: MouseEvent<HTMLSpanElement>): void
}

const ButtonText: FC<ButtonTextProps> = ({
  type = 'default',
  disabled,
  children,
  className,
  ...rest
}) => {
  return (
    <span
      {...rest}
      className={classNames(
        'gm-button-text',
        `gm-button-text-${type}`,
        { disabled },
        className
      )}
    >
      {children}
    </span>
  )
}

export default ButtonText
export type { ButtonTextProps }
