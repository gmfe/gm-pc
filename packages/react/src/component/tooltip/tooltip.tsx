import React, { forwardRef, HTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'
import { Popover } from '../popover'
import SVGQuestionCircle from '../../svg/question-circle-o.svg'

interface TooltipProps extends HTMLAttributes<HTMLSpanElement> {
  popup: ReactNode
  right?: boolean
  top?: boolean
  center?: boolean
  offset?: number
  showArrow?: boolean
}

const Tooltip = forwardRef<Popover, TooltipProps>(
  (
    { popup, children, right, top, center, offset, showArrow, className, ...rest },
    ref
  ) => (
    <Popover
      popup={popup}
      ref={ref}
      top={top}
      type='hover'
      right={right}
      offset={offset}
      center={center}
      showArrow={showArrow}
    >
      {children ?? (
        <span {...rest} className={classNames('gm-text-desc', className)}>
          <SVGQuestionCircle />
        </span>
      )}
    </Popover>
  )
)

export default Tooltip
export type { TooltipProps }
