import React, { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'

type LeftProps = HTMLAttributes<HTMLDivElement>

const Left: FC<LeftProps> = ({ className, children, ...rest }) => {
  return (
    <div {...rest} className={classNames('gm-framework-left-default', className)}>
      <div className='gm-framework-left-default-inner'>{children}</div>
    </div>
  )
}

export default Left
export type { LeftProps }
