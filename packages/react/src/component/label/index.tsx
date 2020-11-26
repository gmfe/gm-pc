import React, { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'

export type LabelType = 'default' | 'primary' | 'danger' | 'inactive' | 'gray'

interface LabelProps extends HTMLAttributes<HTMLDivElement> {
  /** 标签样式种类 */
  type?: LabelType
}

const Label: FC<LabelProps> = ({ type = 'default', className, children, ...rest }) => {
  return (
    <div {...rest} className={classNames('gm-label', className, `gm-label-${type}`)}>
      {children}
    </div>
  )
}

export default Label
