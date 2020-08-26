import React, { CSSProperties, FC } from 'react'
import SVGDown from '../../../svg/down.svg'
import classNames from 'classnames'

interface IconDownUpProps {
  active?: boolean
  className?: string
  style?: CSSProperties
}

const IconDownUp: FC<IconDownUpProps> = ({ active, className, style }) => {
  return (
    <SVGDown
      className={classNames('gm-icon-down-up', { active }, className)}
      style={style}
    />
  )
}

export default IconDownUp
export type { IconDownUpProps }
