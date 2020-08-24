import React from 'react'
import { observable } from 'mobx'
import ColorPicker from './color_picker'

const store = observable({
  color: '',
  setColor(color: string) {
    this.color = color
  },
})

export const ComColorPicker = () => (
  <ColorPicker value={store.color} onChange={(value) => store.setColor(value)}>
    <span>选择颜色 {store.color}</span>
  </ColorPicker>
)

export default {
  title: '表单/ColorPicker',
}
