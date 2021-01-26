import React from 'react'
import { Observer } from 'mobx-react'
import { Token } from 'gm_api/src/oauth'
import { configError, initAuth } from '@gm-common/x-request'
import { LayoutRoot } from '../packages/react/src'
import { setLocale } from '../packages/locales/src'

import './style.less'

// 多语相关
let lng = localStorage.getItem('_gm-pc_lng')
lng = JSON.parse(lng)
console.log('lng', lng)
setLocale(lng)

// 请求
initAuth(Token.url, 'access_token')
configError((message) => {
  console.error(message)
})

// 做性能分析用
if (process.env.NODE_ENV !== 'production') {
  // const whyDidYouRender = require('@welldone-software/why-did-you-render')
  // whyDidYouRender(React)
}

// 响应 mobx
export const decorators = [
  (storeFn) => (
    <React.Fragment>
      <Observer>{() => storeFn()}</Observer>
      <LayoutRoot />
    </React.Fragment>
  ),
]
