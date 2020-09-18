import React, { FC, HTMLAttributes, MouseEvent } from 'react'
import SVGCloseup from '../../svg/closeup.svg'
import SVGExpand from '../../svg/expand.svg'

interface IconExpandProps extends HTMLAttributes<HTMLDivElement> {
  onClick(e: MouseEvent<HTMLDivElement>): void
  active: boolean
}

const IconExpand: FC<IconExpandProps> = ({ active, onClick, ...rest }) => {
  return (
    <div {...rest} onClick={onClick}>
      {active ? (
        <SVGCloseup className='gm-icon-expand-close gm-text-primary' />
      ) : (
        <SVGExpand className='gm-icon-expand-expand' />
      )}
    </div>
  )
}

export default IconExpand
