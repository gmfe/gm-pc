import React, { FC, MouseEventHandler, useLayoutEffect, useRef, useState } from 'react'
import { PopupProps } from './types'
import classNames from 'classnames'
import A from './a'

const Popup: FC<PopupProps> = ({
  parentRect,
  data,
  selected,
  onSelect,
  onPushCreate,
}) => {
  const refDom = useRef<HTMLDivElement>(null)
  const [marginTop, setMarginTop] = useState(0)

  useLayoutEffect(() => {
    const { offsetHeight } = refDom.current!
    const diff = parentRect.y + offsetHeight - document.documentElement.clientHeight
    if (diff > 0) {
      setMarginTop(-diff)
    }
  }, [parentRect])

  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = (e) => {
    e.currentTarget.classList.add('gm-nav-three-wrap-bg')
  }

  const handleMouseLeave: MouseEventHandler<HTMLDivElement> = (e) => {
    e.currentTarget.classList.remove('gm-nav-three-wrap-bg')
  }

  return (
    <div
      ref={refDom}
      className='gm-nav-popup'
      style={{
        marginTop: `${marginTop}px`,
        top: parentRect.top,
      }}
    >
      <div className='gm-nav-popup-grid'>
        {data.map((v, i) => (
          <div key={i} className='gm-nav-two' style={v.style}>
            {!!v.name && <div className='gm-nav-two-title'>{v.name}</div>}
            <div>
              {v.sub.map((s, si) => (
                <div
                  className={classNames('gm-nav-three-wrap', {
                    active: selected.startsWith(s.link),
                  })}
                  key={si}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <A
                    key={si}
                    href={s.link}
                    className='gm-nav-three'
                    onClick={(event) => {
                      event.preventDefault()
                      onSelect(s)
                    }}
                  >
                    {s.name}
                  </A>
                  {s.toCreate && (
                    <span
                      className='gm-nav-three-create'
                      title={s.toCreate.tip}
                      onClick={() => onPushCreate(s)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Popup
