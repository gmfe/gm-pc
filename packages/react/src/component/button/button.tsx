import React, { FC, useState, MouseEvent, AnchorHTMLAttributes } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import { is } from '@gm-common/tool'
import { Loading } from '../loading'

type ButtonType = 'default' | 'primary' | 'success' | 'danger' | 'link'
type ButtonSize = 'large'
type ButtonHTMLType = 'submit' | 'button' | 'reset'

interface ButtonProps
  extends AnchorHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  type?: ButtonType
  plain?: boolean
  size?: ButtonSize
  block?: boolean
  htmlType?: ButtonHTMLType
  loading?: boolean
  href?: string
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
}

const Button: FC<ButtonProps> = ({
  type = 'default',
  plain,
  size,
  block,
  disabled,
  onClick = _.noop,
  loading,
  href,
  children,
  htmlType = 'button',
  className,
  ...rest
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const loadFlag = loading || isLoading

  const handleClick = (
    event: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLAnchorElement>
  ) => {
    if (loadFlag) {
      return
    }

    const result = onClick(event)

    if (!is.promise(result)) {
      return
    }

    setIsLoading(true)

    Promise.resolve(result).finally(() => {
      setIsLoading(false)
    })
  }
  const Tag = type === 'link' && href ? 'a' : 'button'

  return (
    <Tag
      {...rest}
      type={htmlType}
      href={href}
      className={classNames(
        `gm-btn gm-btn-${type}`,
        {
          'gm-btn-block': block,
          [`gm-btn-${size}`]: size,
          'gm-btn-plain': type !== 'link' && plain,
        },
        className
      )}
      disabled={loadFlag || disabled}
      onClick={handleClick}
    >
      {loadFlag && <Loading className='gm-btn-loading' size={12} />}
      {children}
    </Tag>
  )
}

export default Button
export type { ButtonProps, ButtonType, ButtonSize, ButtonHTMLType }
