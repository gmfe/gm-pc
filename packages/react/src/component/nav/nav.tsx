import React, { FC, useRef } from 'react'
import classNames from 'classnames'
import { NavProps } from './types'
import { Flex } from '../flex'
import NavItem from './nav_item'
import NavSingleItem from './nav_single_item'
import useMouseMoveLock from '../../common/hooks/use_mouse_move_lock'

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
  const refNav = useRef<HTMLDivElement>(null)
  const [lock, clear] = useMouseMoveLock(refNav)

  const handleMouseLeave = () => {
    clear()
  }
  const handleMouseEnter = () => {
    clear()
  }

  return (
    <Flex
      column
      {...rest}
      className={classNames('gm-nav', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className='gm-nav-logo'>{logo}</div>
      <Flex flex column className='gm-nav-content' ref={refNav}>
        {data.map((one, i) => (
          <NavItem
            key={one.link}
            showSub={lock === i}
            data={one}
            selected={selected}
            onSelect={onSelect}
          />
        ))}
        {other}
      </Flex>
      <div id='gmNavPopupContainer' />
    </Flex>
  )
}

export { NavItem, NavSingleItem }
export default Nav
