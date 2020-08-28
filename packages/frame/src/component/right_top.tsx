import React, { ReactNode, FC } from 'react'
import { Flex } from '@gm-pc/react'
import SVGMenu from '../svg/menu.svg'

export interface RightTopProps {
  breadcrumb?: ReactNode
  info?: ReactNode
  onMenuBtnClick?(): void
}

const RightTop: FC<RightTopProps> = ({ breadcrumb, onMenuBtnClick, info }) => {
  return (
    <div className='gm-framework-right-top-default'>
      <Flex className='gm-framework-right-top-default-inner' alignCenter>
        <Flex
          alignCenter
          className='gm-framework-right-top-default-mobile-nav'
          onClick={onMenuBtnClick}
        >
          <SVGMenu className='gm-padding-lr-10 gm-cursor' />
        </Flex>
        <Flex flex className='gm-framework-breadcrumb'>
          {breadcrumb}
        </Flex>
        <div className='gm-framework-info'>{info}</div>
      </Flex>
    </div>
  )
}

export default RightTop
