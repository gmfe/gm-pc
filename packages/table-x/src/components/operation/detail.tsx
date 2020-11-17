import React, { FC, HTMLAttributes, MouseEvent } from 'react'
import { getLocale } from '@gm-pc/locales'
import OperationIcon from './icon'
import SVGCheckDetail from '../../svg/check-detail.svg'

interface OperationDetailProps extends HTMLAttributes<HTMLDivElement> {
  href?: string
  open?: boolean
}

const OperationDetail: FC<OperationDetailProps> = ({ href, open, onClick, ...rest }) => {
  const handleClick = (event: MouseEvent<HTMLDivElement>): void => {
    onClick && onClick(event)
    if (href) {
      if (open) {
        window.open(href)
      } else {
        window.location.href = href
      }
    }
  }

  return (
    <OperationIcon {...rest} onClick={handleClick} tip={getLocale('详情')}>
      <SVGCheckDetail />
    </OperationIcon>
  )
}

export default OperationDetail
