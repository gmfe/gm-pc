import React, { FC, useEffect, useRef, useState, MouseEvent } from 'react'
import classNames from 'classnames'
import { NavItemProps, NavDataLevel2 } from './types'
import A from './a'
import Portal from './portal'
import Popup from './popup'
import _ from 'lodash'

function isOneActive(oneSub: NavDataLevel2[], selected: string): boolean {
  return !!_.find(oneSub, (two) => {
    return !!_.find(two.sub, (three) => {
      return selected.includes(three.link)
    })
  })
}

const NavItem: FC<NavItemProps> = ({ data, selected, onSelect, showActive }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [rect, setRect] = useState<DOMRect | null>(null)

  const { icon, name, link, sub } = data
  const active = isOneActive(sub, selected)

  useEffect(() => {
    if (showActive === link) {
      setRect(ref.current!.getBoundingClientRect())
    }
  }, [showActive, link])

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    if (sub[0]) {
      onSelect(sub[0].sub[0])
    }
  }

  const handleSelect = (data: NavDataLevel2) => {
    onSelect(data)
    setRect(null)
  }

  const handleMouseEnter = () => {
    setRect(ref.current!.getBoundingClientRect())
  }

  const handleMouseLeave = () => {
    setRect(null)
  }

  return (
    <div
      ref={ref}
      className={classNames('gm-nav-one-box', { active })}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <A href={link} className='gm-nav-one' onClick={handleClick}>
        <div className='gm-nav-one-icon'>{icon}</div>
        <div className='gm-nav-one-text'>{name}</div>
      </A>
      {sub && <div className='gm-nav-one-triangle' />}
      {sub && (
        <Portal>
          {rect && (
            <Popup
              parentRect={rect}
              data={sub}
              selected={selected}
              onSelect={handleSelect}
            />
          )}
        </Portal>
      )}
    </div>
  )
}
export default NavItem
