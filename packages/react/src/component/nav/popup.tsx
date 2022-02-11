import React, { FC, MouseEventHandler, useLayoutEffect, useRef, useState } from 'react'
import { PopupProps } from './types'
import classNames from 'classnames'
import { Flex } from '../flex'
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

  /**
   * 在 对应的 div 设置了 最大宽度 900 px
   * @description UI 图是超过五个换行, 现在无论多少模块都在一行, 根据UI图对宽度进行处理
   * @param number 二级菜单的个数
   * @returns popup 的宽度
   */
  const setPopupWidth = (number: number): string => {
    // 只有一个的基本宽度, 根据 UI图, 一个三级路由占据的 宽度 + 左右margin
    const baseWidth = 212
    // 有多个模块 半句的最大宽段, 超出 900 换行
    const maxWidth = baseWidth + (number - 1) * 172
    return maxWidth + 'px'
  }

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
        width: `${setPopupWidth(data.length)}`,
        maxWidth: '900px',
      }}
    >
      <Flex wrap>
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
      </Flex>
    </div>
  )
}

export default Popup
