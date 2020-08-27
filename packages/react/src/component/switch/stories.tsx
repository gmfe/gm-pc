import React from 'react'
import Switch from './switch'
import { observable } from 'mobx'

const store = observable({
  checked: false,
  toggle() {
    this.checked = !this.checked
  },
})

export const ComSwitch = () => (
  <div>
    <Switch
      checked={store.checked}
      onChange={() => {
        store.toggle()
      }}
    />
    <Switch
      checked={store.checked}
      onChange={() => {
        store.toggle()
      }}
      on='上架'
      off='下架'
    />
    <div>
      <Switch checked />
      <Switch checked type='primary' />
      <Switch checked type='success' />
      <Switch checked type='danger' />
    </div>
  </div>
)

export default {
  title: '表单/Switch',
}
