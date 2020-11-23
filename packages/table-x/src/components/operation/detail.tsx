import React, { FC, HTMLAttributes, MouseEvent } from 'react'
import { getLocale } from '@gm-pc/locales'
import OperationIcon from './icon'
import SVGCheckDetail from '../../svg/check-detail.svg'

interface OperationDetailProps extends HTMLAttributes<HTMLDivElement> {
  href?: string
  open?: boolean
  tip?: string
  disabled?: boolean
}

const OperationDetail: FC<OperationDetailProps> = ({
  href,
  open,
  tip = getLocale('详情'),
  disabled,
  onClick,
  ...rest
}) => {
  const handleClick = (event: MouseEvent<HTMLDivElement>): void => {
    if (disabled) {
      return
    }

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
    <OperationIcon {...rest} onClick={handleClick} tip={tip} disabled={disabled}>
      <SVGCheckDetail />
    </OperationIcon>
  )
}

export default OperationDetail
