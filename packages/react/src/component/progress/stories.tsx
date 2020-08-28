import React from 'react'
import Progress from './progress'

export const ComProgress = () => (
  <div style={{ width: '400px' }}>
    <Progress percentage={10} />
    <Progress percentage={100} />

    <div>type</div>
    <Progress percentage={100} type='success' />
    <Progress percentage={50} type='danger' />

    <div>text</div>
    <Progress percentage={20} text='20斤/100斤' />
  </div>
)

export default {
  title: '反馈/Progress',
}
