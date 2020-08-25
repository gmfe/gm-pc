import React, { CSSProperties, FC } from 'react'
import _ from 'lodash'

interface AffixProps {
  top?: number
  bottom?: number
}

const Affix: FC<AffixProps> = ({ children, top, bottom }) => {
  const style: CSSProperties = {
    position: 'sticky',
    zIndex: 950,
  }

  if (!_.isNil(top)) {
    style.top = `${top}px`
  }

  if (!_.isNil(bottom)) {
    style.bottom = `${bottom}px`
  }

  return (
    <div className='gm-affix' style={style}>
      {children}
    </div>
  )
}

export default Affix
export type { AffixProps }
