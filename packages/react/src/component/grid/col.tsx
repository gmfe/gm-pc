import React, { FC, useContext } from 'react'
import classNames from 'classnames'
import { ColProps } from './types'
import { RowContext } from './util'

const SIZE_LIST = ['sm', 'md', 'lg', 'xl']

const Col: FC<ColProps> = ({ span, offset, style, className, children, ...rest }) => {
  const { gutter } = useContext(RowContext)

  let sizeClasses: object = {}
  SIZE_LIST.forEach((size) => {
    let sizeProps: ColProps = {}
    if (typeof (rest as any)[size] === 'number') {
      sizeProps.span = (rest as any)[size]
    } else if (typeof (rest as any)[size] === 'object') {
      sizeProps = (rest as any)[size] ?? {}
    }

    delete (rest as any)[size]

    sizeClasses = {
      ...sizeClasses,
      [`gm-grid-col-${size}-span-${sizeProps.span}`]: !!sizeProps.span,
      [`gm-grid-col-${size}-offset-${sizeProps.offset}`]: !!sizeProps.offset,
    }
  })

  const colStyle = style || {}
  if (typeof gutter === 'number' && gutter! > 0) {
    colStyle.paddingLeft = gutter / 2
    colStyle.paddingRight = gutter / 2
  }

  return (
    <div
      {...rest}
      style={colStyle}
      className={classNames(
        'gm-grid-col',
        {
          [`gm-grid-col-span-${span}`]: span,
          [`gm-grid-col-offset-${offset}`]: offset,
        },
        className,
        sizeClasses
      )}
    >
      {children}
    </div>
  )
}

export default Col
