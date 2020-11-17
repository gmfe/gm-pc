import React, { FC, useState, MouseEvent, useRef } from 'react'
import classNames from 'classnames'
import { NavProps } from './types'
import { Flex } from '../flex'
import NavItem from './nav_item'
import NavSingleItem from './nav_single_item'

const Nav: FC<NavProps> = ({
  logo,
  data,
  selected,
  onSelect,
  showActive,
  other,
  className,
  style,
  ...rest
}) => {
  // 根据鼠标点到导航栏右边的线距离，判断移动方向
  const temp = useRef(0)
  // 控制hover
  const canHover = useRef(true)
  // 优化体验,设置计时器
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const refNav = useRef<HTMLDivElement>(null)
  // 控制菜单浮层
  const [hoverLink, setCanHoverLink] = useState(showActive || '')

  // 每个 nav_item 的 mouseMove 的 callback
  const handleMouseMove = (event: MouseEvent, link: string) => {
    if (canHover.current) {
      setCanHoverLink(link)
    }
    checkActive(event.clientX)
  }

  // 根据 navItem 的鼠标 x 坐标变化，控制 hover
  const checkActive = (mouseX: number) => {
    // 导航栏右侧 x 边界坐标值
    const maxX = refNav.current!.getBoundingClientRect().width
    const nowTemp = maxX - mouseX
    // 比较前后，两次坐标差值，判断用户鼠标行为，是左滑或右滑
    if (nowTemp < temp.current) {
      // 右滑，锁hover
      canHover.current = false
      // 用户鼠标停止时，无法触发此事件，所以加入定时器，优化用户悬停情况下，自动解锁 hover
      clearTimeout(timer.current as ReturnType<typeof setTimeout>)
      const newTimer = setTimeout(() => {
        canHover.current = true
      }, 100)
      timer.current = newTimer
    } else {
      // 左滑，不锁 hover
      canHover.current = true
    }
    temp.current = nowTemp
  }

  const handleMouseLeave = () => {
    setCanHoverLink('')
  }
  const handleMouseEnter = () => {
    // 解决重新进入状态初始化问题
    setCanHoverLink('')
  }

  return (
    <Flex
      column
      {...rest}
      ref={refNav}
      className={classNames('gm-nav', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className='gm-nav-logo'>{logo}</div>
      <Flex flex column className='gm-nav-content'>
        {data.map((one) => (
          <NavItem
            key={one.link}
            showSub={hoverLink === one.link}
            onMouseMove={handleMouseMove}
            data={one}
            selected={selected}
            onSelect={onSelect}
          />
        ))}
        <div style={{ height: '100px' }} />
        {other}
      </Flex>
      <div id='gmNavPopupContainer' />
    </Flex>
  )
}

export { NavItem, NavSingleItem }
export default Nav
