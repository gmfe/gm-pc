import { get } from 'lodash'
import React, { createRef, FC, useContext, useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import Context from './context'
import { CacheItem, VBrowserEvent } from './v_browser'
import classNames from 'classnames'
import './style.less'

// @ts-ignore
const req = require.context('@/pages', true, __AUTO_ROUTER_REG__, 'lazy')
const pages = req.keys().map((key) => {
  return {
    path: key.replace(/^\./, '').replace('/index.page.tsx', ''),
    loader: () => Promise.resolve(req(key)),
  }
})

export const VBrowserContainer: FC<{ className?: string }> = ({
  className,
  ...props
}) => {
  const containerRef = createRef<HTMLDivElement>()
  const { portalContainer, onMounted, cache } = useContext(Context)

  useEffect(() => {
    onMounted()
  }, [])

  const renderPage = (activeElement: HTMLDivElement) => {
    const contentContainer = containerRef.current!
    contentContainer.appendChild(activeElement)
  }
  // 页面激活
  const _handleCreate = (path: string) => {
    const el = cache[path].vNode.ref.current
    if (!el) return
    renderPage(el)
  }
  // 装载页面
  const _handleOnShow = (path: string) => {
    const el = cache[path].vNode.ref.current
    if (!el) return
    const contentContainer = containerRef.current!
    const children = (contentContainer.childNodes as any) as HTMLDivElement[]
    children.forEach((child) => child.parentNode!.removeChild(child))
    renderPage(el)
    dispatchEvent(new CustomEvent(VBrowserEvent.UI_UPDATED, { detail: path }))
  }
  // 卸载页面
  const _handleOnHide = (path: string) => {
    console.log('hide', path)
    // emit event
  }
  // 避免Context更新后重新渲染container
  const container = useRef(
    <>
      <div
        className={classNames('browser-container', className)}
        ref={containerRef}
        {...props}
      />
      {createPortal(
        pages.map((page) => {
          return (
            <VBrowserContent
              key={page.path}
              path={page.path}
              onCreate={_handleCreate}
              onShow={_handleOnShow}
              onHide={_handleOnHide}
            />
          )
        }),
        portalContainer
      )}
    </>
  )
  return container.current
}

interface VBrowserContentProps {
  path: string
  onCreate: (path: string) => void
  onShow: (path: string) => void
  onHide: (path: string) => void
}
export const VBrowserContent: FC<VBrowserContentProps> = ({
  path,
  onCreate,
  onShow,
  onHide,
}) => {
  const [active, setActive] = useState(false)
  // component 初始为null，被设置后，预期是不会再次被设置, 被重新设置会使原有的component被销毁，组件状态丢失
  const [component, setComponent] = useState<CacheItem['vNode'] | null>(null)
  const { cache, setCache } = useContext(Context)
  useEffect(() => {
    const onVBrowserUpdate = (e: any) => {
      setActive(e.detail.path === path)
    }
    addEventListener(VBrowserEvent.UI_UPDATE, onVBrowserUpdate)
    return () => {
      removeEventListener(VBrowserEvent.UI_UPDATE, onVBrowserUpdate)
    }
  }, [])

  useEffect(() => {
    if (!active) {
      const component = get(cache, [path, 'vNode'])
      if (component) onHide(path)
      return
    }
    if (cache[path]) {
      onShow(path)
    } else {
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
        return null
      })
    }
  }, [active])

  useEffect(() => {
    if (!component) return
    setCache(path, { vNode: component })
    onCreate(path)
    onShow(path)
  }, [component])

  return component || <div className='vbrowser-placeholder' />
}
