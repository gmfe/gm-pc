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

const NavItem: FC<NavItemProps> = ({
  data,
  selected,
  onSelect,
  onMouseMove,
  onPushCreate,
  showSub,
  footerImage,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [rect, setRect] = useState<DOMRect | null>(null)

  const { icon, iconActive, name, link, sub } = data
  const active = isOneActive(sub, selected)

  useEffect(() => {
    if (showSub) {
      setRect(ref.current!.getBoundingClientRect())
    } else {
      setRect(null)
    }
  }, [showSub])

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

  const handlePushCreate = (data: NavDataLevel2) => {
    onPushCreate(data)
  }

  let iconE = icon
  if ((rect || active) && iconActive) {
    iconE = iconActive
  }

  return (
    <div ref={ref} className={classNames('gm-nav-one-box', { active, hover: !!rect })}>
      {footerImage ? (
        <A href={link} onClick={handleClick} onMouseMove={(e) => onMouseMove(e, link)}>
          {footerImage}
        </A>
      ) : (
        <A
          href={link}
          className='gm-nav-one'
          onClick={handleClick}
          onMouseMove={(e) => onMouseMove(e, link)}
        >
          <span className='gm-nav-one-icon'>{iconE}</span>
          <span className='gm-nav-one-text'>{name}</span>
        </A>
      )}

      {sub && <div className='gm-nav-one-triangle' />}
      {sub && (
        <Portal>
          {rect && (
            <Popup
              parentRect={rect}
              data={sub}
              selected={selected}
              onSelect={handleSelect}
              onPushCreate={handlePushCreate}
            />
          )}
        </Portal>
      )}
    </div>
  )
}
export default NavItem
