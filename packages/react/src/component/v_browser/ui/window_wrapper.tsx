/* eslint-disable dot-notation */
import { get } from 'lodash'
import { observer } from 'mobx-react'
import React, { createRef, FC, useContext, useEffect } from 'react'
import BrowserContext from '../context/browser'
import { CacheItem } from '../types'
import { pages } from '../v_browser'

interface WindowWrapperProps {
  path: string
}
const WindowWrapper: FC<WindowWrapperProps> = ({ path }) => {
  const placeholder = (<div className='v-browser-placeholder' />) as CacheItem['vNode']
  const browser = useContext(BrowserContext)
  const w = browser.windows.find((w) => w.path === path)

  const _handleShow = (vNode: CacheItem['vNode']) => {
    const active = browser.activeWindow?.path === path
    if (vNode?.ref.current) vNode.ref.current.style.display = 'none'
    // 激活窗口
    if (vNode && active) {
      if (!vNode.ref.current) return
      vNode.ref.current.style.display = 'block'
      browser['_fire']('show', w!)
    }
  }

  useEffect(() => {
    const active = browser.activeWindow?.path === path
    const vNode = get(browser['_cache'], [path, 'vNode'])
    if (!vNode && active) {
      // 创建缓存
      const page = pages.find((p) => p.path === path)
      if (!page) throw new Error('[VBrowser] page not found: ' + path)
      page.loader().then((module) => {
        const Component = module.default
        const vNode = (
          <div
            className='v-browser-window-content'
            data-vbrowser-window={path}
            ref={createRef()}
          >
            <Component />
          </div>
        ) as CacheItem['vNode']
        browser['_setCache'](path, { vNode })
        browser['_fire']('show', w!)
        return null
      })
      return
    }

    _handleShow(vNode)
  }, [browser.activeWindow?.path])

  // 创建缓存完成
  useEffect(() => {
    const vNode = get(browser['_cache'], [path, 'vNode'])
    if (!vNode) return
    _handleShow(vNode)
  }, [browser['_cache'][path]])

  return get(browser['_cache'], [path, 'vNode']) || placeholder
}

export default observer(WindowWrapper)
