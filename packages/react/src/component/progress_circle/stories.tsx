import React from 'react'
import ProgressCircle from './progress_circle'
import { observable } from 'mobx'

const store = observable({
  percentage: 0,
  setPercentage(percentage: any) {
    this.percentage = percentage
  },
})

setTimeout(() => {
  store.setPercentage(80)
}, 1000)

export const ComProgressCircle = () => (
  <div>
    <ProgressCircle percentage={store.percentage} />
    <div>type</div>
    <ProgressCircle percentage={store.percentage} type='success' />
    <ProgressCircle percentage={store.percentage} type='danger' />
    <div>size</div>
    <ProgressCircle percentage={store.percentage} size={100} />
    <div>lineWidth</div>
    <ProgressCircle percentage={store.percentage} size={100} lineWidth={20} />
  </div>
)

export default {
  title: '反馈/ProgressCircle',
}
