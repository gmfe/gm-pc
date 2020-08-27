import React from 'react'
import Tip from './tip'

let lastTip: string

export const ComTip = () => (
  <div>
    <div>
      <button onClick={() => (lastTip = Tip.tip('提示啦，提示啦'))}>默认 3s 关闭</button>
      <button
        onClick={() => {
          Tip.success('成功成功')
        }}
      >
        success
      </button>
      <button
        onClick={() => {
          Tip.danger('危险危险')
        }}
      >
        danger
      </button>
    </div>
    <div>
      <button
        onClick={() =>
          (lastTip = Tip.success({
            children: '需要用户自行关闭的',
            time: 0,
            onClose: () => console.log('tip closed by user'),
          }))
        }
      >
        需要用户自行关闭的
      </button>
      <button onClick={() => Tip.clear(lastTip)}>关闭指定 tip （比如最后一个tip）</button>
    </div>
  </div>
)

export default {
  title: '反馈/Tip',
}
