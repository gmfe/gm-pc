import React from 'react'
import IconDownUp from './icon_down_up'
import { observable } from 'mobx'

const store = observable({
  active: false,
  toggle() {
    this.active = !this.active
  },
})

export const ComIconDownUp = () => (
  <div>
    <IconDownUp active={store.active} />
    <button onClick={() => store.toggle()}>click</button>
  </div>
)

export default {
  title: '其他/IconDownUp',
}
