import React from 'react'
import FlipNumber from './flip_number'
import { observable } from 'mobx'

const store = observable({
  from: 0,
  to: 0,
})

setTimeout(() => {
  store.from = 234.2343
  store.to = 709394
})

export const ComFlipNumber = () => (
  <FlipNumber
    useGroup
    delay={1000}
    decimal={2}
    from={store.from}
    to={store.to}
    className='gm-text-20'
  />
)

export default {
  title: '反馈/FlipNumber',
}
