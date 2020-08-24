import React, { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'

interface CollapseProps extends HTMLAttributes<HTMLDivElement> {
  active: boolean
}

const Collapse: FC<CollapseProps> = ({ active, className, style, children, ...rest }) => {
  return (
    <div
      {...rest}
      className={classNames('gm-collapse', className)}
      style={{
        transition: active ? '0.5s ease all' : 'inherit',
        height: active ? 'inherit' : '0',
        opacity: active ? 1 : 0,
        overflow: active ? 'inherit' : 'hidden',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export default Collapse
export type { CollapseProps }
