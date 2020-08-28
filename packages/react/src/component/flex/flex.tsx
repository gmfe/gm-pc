import React, { HTMLAttributes, forwardRef } from 'react'
import classNames from 'classnames'

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  flex?: number | boolean
  /** 本身是 display:flex，flex 会使子元素 flex-item。设置 block 即可 */
  block?: boolean
  auto?: boolean
  /** flex 会坍缩，提供 none 则不会坍缩 */
  none?: boolean
  width?: string
  height?: string
  row?: boolean
  column?: boolean
  wrap?: boolean
  nowrap?: boolean
  justifyStart?: boolean
  justifyEnd?: boolean
  justifyCenter?: boolean
  justifyBetween?: boolean
  justifyAround?: boolean
  alignStart?: boolean
  alignEnd?: boolean
  alignCenter?: boolean
  alignBaseline?: boolean
  alignStretch?: boolean
  alignContentStart?: boolean
  alignContentEnd?: boolean
  alignContentCenter?: boolean
  alignContentBetween?: boolean
  alignContentAround?: boolean
  alignContentStretch?: boolean
}

const Flex = forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
  const {
    flex,
    block,

    auto,
    none,
    width,
    height,

    row,
    column,

    wrap,
    nowrap,

    justifyStart,
    justifyEnd,
    justifyCenter,
    justifyBetween,
    justifyAround,

    alignStart,
    alignEnd,
    alignCenter,
    alignBaseline,
    alignStretch,

    alignContentStart,
    alignContentEnd,
    alignContentCenter,
    alignContentBetween,
    alignContentAround,
    alignContentStretch,

    className,
    style,
    children,

    ...rest
  } = props
  const cn = classNames(
    {
      'gm-flex': true,
      'gm-flex-block': block,

      'gm-flex-flex': flex,
      'gm-flex-auto': auto,
      'gm-flex-none': none || width || height,

      'gm-flex-row': row,
      'gm-flex-column': column,

      'gm-flex-wrap': wrap,
      'gm-flex-nowrap': nowrap,

      'gm-flex-justify-start': justifyStart,
      'gm-flex-justify-end': justifyEnd,
      'gm-flex-justify-center': justifyCenter,
      'gm-flex-justify-between': justifyBetween,
      'gm-flex-justify-around': justifyAround,

      'gm-flex-align-start': alignStart,
      'gm-flex-align-end': alignEnd,
      'gm-flex-align-center': alignCenter,
      'gm-flex-align-baseline': alignBaseline,
      'gm-flex-align-stretch': alignStretch,

      'gm-flex-align-content-start': alignContentStart,
      'gm-flex-align-content-end': alignContentEnd,
      'gm-flex-align-content-center': alignContentCenter,
      'gm-flex-align-content-between': alignContentBetween,
      'gm-flex-align-content-around': alignContentAround,
      'gm-flex-align-content-stretch': alignContentStretch,
    },
    className
  )

  const s = Object.assign({}, style)
  if (flex) {
    s.flex = typeof flex === 'boolean' ? 1 : flex
    s.WebkitFlex = typeof flex === 'boolean' ? 1 : flex
  }
  if (height) {
    s.height = height
  }
  if (width) {
    s.width = width
  }

  return (
    <div ref={ref} {...rest} className={cn} style={s}>
      {children}
    </div>
  )
})

export default Flex
export type { FlexProps }
