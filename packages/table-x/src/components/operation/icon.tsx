import React, { FC, HTMLAttributes, MouseEvent, ReactNode, useRef } from 'react'
import classNames from 'classnames'
import { Popover, Tooltip } from '@gm-pc/react'

interface OperationIconProps extends HTMLAttributes<HTMLDivElement> {
  tip?: ReactNode
}

const OperationIcon: FC<OperationIconProps> = ({
  tip,
  onClick,
  children,
  className,
  ...rest
}) => {
  const refTip = useRef<Popover>(null)

  const handleClick = (event: MouseEvent<HTMLDivElement>): void => {
    refTip.current!.apiDoSetActive(false)

    onClick && onClick(event)
  }

  return (
    <Tooltip
      popup={<div className='gm-padding-5'>{tip}</div>}
      showArrow
      center
      ref={refTip}
    >
      <div
        {...rest}
        onClick={handleClick}
        className={classNames(
          'gm-inline-block gm-cursor gm-padding-5 gm-text-14 gm-text gm-text-hover-primary',
          className
        )}
      >
        {children}
      </div>
    </Tooltip>
  )
}

export default OperationIcon
