/* eslint-disable dot-notation */
import { get } from 'lodash'
import { observer } from 'mobx-react'
import React, { createRef, FC, useContext, useEffect, useState } from 'react'
import BrowserContext from '../context/browser'
import { CacheItem } from '../types'
import { pages } from '../v_browser'

interface WindowWrapperProps {
  path: string
  onCreate: (path: string) => void
  onShow: (path: string) => void
  onHide: (path: string) => void
}
const WindowWrapper: FC<WindowWrapperProps> = ({ path, onCreate, onShow, onHide }) => {
  // component 初始为null，被设置后，预期是不会再次被设置, 被重新设置会使原有的component被销毁，组件状态丢失
  const [component, setComponent] = useState<CacheItem['vNode'] | null>(null)
  const browser = useContext(BrowserContext)

  useEffect(() => {
    const active = browser.activeWindow?.path === path
    if (!active) {
      const component = get(browser['_cache'], [path, 'vNode'])
      if (component) onHide(path)
      return
    }
    if (browser['_cache'][path]) {
      // 激活
      onShow(path)
    } else {
      // 创建缓存
      const page = pages.find((p) => p.path === path)
      if (!page) throw new Error('[VBrowser] page not found: ' + path)
      page.loader().then((module) => {
        const Component = module.default
        const vNode = (
          <div data-vbrowser-window={path} ref={createRef()}>
            <Component />
          </div>
        ) as CacheItem['vNode']
        setComponent(vNode)
        browser['_setCache'](path, { vNode })
        onCreate(path)
        onShow(path)
        return null
      })
    }
  }, [browser.activeIndex])

  return component || <div className='vbrowser-placeholder' />
}

export default observer(WindowWrapper)
