import React, { FC, useEffect, useState } from 'react'
import { pages } from '../v_browser'

interface IframePortalProps {}

/**
 * 此组件使用在Switch中，用来访问任意子页面，子页面路径通过url参数path指定
 */
const IframePortal: FC<IframePortalProps> = () => {
  const [component, setComponent] = useState<JSX.Element | null>(null)

  useEffect(() => {
    const query = new URLSearchParams(location.href.split('?')[1] || '')
    const path = query.get('path')
    const page = pages.find((p) => p.path === path)
    if (!page) throw new Error('[VWindow] page not found: ' + path)
    page.loader().then((module) => {
      const Component = module.default
      setComponent(<Component />)
      console.timeEnd('IframePortal')
      return null
    })
  }, [])

  return component
}

export default IframePortal
