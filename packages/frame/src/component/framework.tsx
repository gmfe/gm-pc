import React, { useEffect, FC, ReactNode } from 'react'
import { Flex, EVENT_TYPE } from '@gm-pc/react'
import classNames from 'classnames'
import _ from 'lodash'

interface FrameworkProps {
  menu: ReactNode
  rightTop: ReactNode
  scrollTop?: void
  showMobileMenu?: boolean
  isFullScreen?: boolean
  children: ReactNode
}

interface FrameworkStatic {
  scrollTop(): void
}

function useWindowEventListener(
  type: string,
  listener: EventListenerOrEventListenerObject
) {
  useEffect(() => {
    window.addEventListener(type, listener)

    return () => {
      window.removeEventListener(type, listener)
    }
  }, [type, listener])
}

const Framework: FC<FrameworkProps> & FrameworkStatic = ({
  showMobileMenu,
  isFullScreen,
  menu,
  rightTop,
  children,
}) => {
  const addOverflowClass = () => {
    let flag: any = window.document.body.dataset.overflowFlag || 0
    flag++
    window.document.body.dataset.overflowFlag = flag

    if (flag === 1) {
      window.document.body.classList.add('gm-overflow-hidden')
    }
  }

  const removeOverflowClass = () => {
    let flag: any = window.document.body.dataset.overflowFlag || 0
    flag--
    window.document.body.dataset.overflowFlag = flag
    if (flag === 0) {
      window.document.body.classList.remove('gm-overflow-hidden')
    }
  }

  const doScroll = _.throttle(() => {
    window.dispatchEvent(new window.CustomEvent(EVENT_TYPE.BROWSER_SCROLL))
  }, 200)

  useWindowEventListener(EVENT_TYPE.MODAL_SHOW, addOverflowClass)
  useWindowEventListener(EVENT_TYPE.MODAL_HIDE, removeOverflowClass)
  useWindowEventListener(EVENT_TYPE.DRAWER_SHOW, addOverflowClass)
  useWindowEventListener(EVENT_TYPE.DRAWER_HIDE, removeOverflowClass)
  useWindowEventListener('scroll', doScroll)

  return (
    <div
      className={classNames('gm-framework', {
        'gm-framework-mobile-menu': showMobileMenu,
      })}
    >
      <div className='gm-framework-inner'>
        {isFullScreen ? (
          children
        ) : (
          <div className='gm-framework-full-height'>
            <Flex className='gm-framework-container'>
              {menu && <div className='gm-framework-left'>{menu}</div>}
              <Flex flex column className='gm-framework-right'>
                {rightTop && <div className='gm-framework-right-top'>{rightTop}</div>}
                <div className='gm-framework-content'>{children}</div>
              </Flex>
            </Flex>
          </div>
        )}
      </div>
    </div>
  )
}

Framework.scrollTop = () => {
  window.scroll(0, 0)
}

export default Framework
export type { FrameworkProps, FrameworkStatic }
