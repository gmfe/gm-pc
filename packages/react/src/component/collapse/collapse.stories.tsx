import React from 'react'
import Collapse from './collapse'
import { observable } from 'mobx'

const store = observable({
  active: true,
  toggleActive() {
    this.active = !this.active
  },
})

export const ComCollapse = () => (
  <div>
    <button onClick={() => store.toggleActive()}>toggle</button>
    <Collapse active={store.active}>啦啦啦啦</Collapse>
  </div>
)

export default {
  title: '布局/Collapse',
}
