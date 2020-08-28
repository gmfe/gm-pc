import React, { FC } from 'react'
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
}) => (
  <Flex column {...rest} className={classNames('gm-nav', className)}>
    <div className='gm-nav-logo'>{logo}</div>
    <Flex flex column className='gm-nav-content'>
      {data.map((one) => (
        <NavItem
          key={one.link}
          showActive={showActive}
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

export { NavItem, NavSingleItem }
export default Nav
