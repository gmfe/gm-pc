import React from 'react'
import Progress from './progress'

export const ComProgress = () => (
  <div style={{ width: '400px' }}>
    <Progress percentage={10} />
    <Progress percentage={100} />

    <div>type</div>
    <Progress percentage={100} type='success' />
    <Progress percentage={50} type='danger' />

    <div>disabledText</div>
    <Progress percentage={20} disabledText />
  </div>
)

export default {
  title: '反馈/Progress',
}
