import React from 'react'

export const ComFlex = () => {
  return (
    <div>
      <div>
        语法见 [Flex](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
        本组件只是个简单的封装
      </div>
      <div>特别的 props 是 none，flex 会坍缩，提供 none 则不会坍缩</div>
    </div>
  )
}

export default {
  title: '布局/Flex',
}
