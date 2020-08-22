import React from 'react'
import './i18n'
import { addDecorator, addParameters } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { Observer } from 'mobx-react'
import { LayoutRoot } from '../packages/react/src'

// 引入样式
import '../packages/react/src/index.less'
// 引入 frame 样式
import '../packages/frame/src/index.less'
// table-x
import '../packages/table-x/src/index.less'
// cropper
import '../packages/cropper/src/index.less'

if (process.env.NODE_ENV !== 'production') {
  // const whyDidYouRender = require('@welldone-software/why-did-you-render')
  // whyDidYouRender(React)
}

addParameters({
  options: {
    showRoots: true,
  },
})

addDecorator(
  withInfo({
    inline: true,
    header: false,
    source: false,
    styles: stylesheet => {
      return {
        ...stylesheet,
        infoBody: {
          ...stylesheet.infoBody,
          borderTop: '1px solid #ccc',
          color: '#444',
          padding: '10px',
          fontWeight: 'normal'
        }
      }
    }
  })
)

addDecorator(storeFn => (
  <React.Fragment>
    <Observer>{() => storeFn()}</Observer>
    <LayoutRoot />
  </React.Fragment>
))
