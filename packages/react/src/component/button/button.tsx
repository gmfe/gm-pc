import React, { FC, useState, MouseEvent, AnchorHTMLAttributes, useContext } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import { is } from '@gm-common/tool'
import { Loading } from '../loading'
import { ConfigContext } from '../config_provider'

type ButtonType = 'default' | 'primary' | 'success' | 'danger' | 'link'
type ButtonSize = 'small' | 'middle' | 'large'
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
  size = 'middle',
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
  const { fontSize } = useContext(ConfigContext)

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
          'gm-btn-plain': type !== 'link' && plain,
          [`gm-btn-${size}`]: size,
          [`gm-btn-text-${fontSize}`]: !!fontSize,
        },
        className
      )}
      disabled={loadFlag || disabled}
      onClick={handleClick}
    >
      {loadFlag && (
        <div style={{ marginRight: 4 }}>
          <Loading size='1em' type={type} />
        </div>
      )}
      {children}
    </Tag>
  )
}

export default Button
export type { ButtonProps, ButtonType, ButtonSize, ButtonHTMLType }
