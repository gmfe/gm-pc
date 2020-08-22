import React from 'react'
import Affix from './affix'

export const ComAffix = () => (
  <div>
    <div style={{ height: '1500px' }} />
    <Affix bottom={0} top={0}>
      <div style={{ backgroundColor: 'red' }}>我会被钉住在底部 和 顶部</div>
    </Affix>
    <div style={{ height: '1500px' }} />
  </div>
)

export default {
  title: '布局/Affix',
}
