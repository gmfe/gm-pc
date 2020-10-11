import React from 'react'
import MultipleSelection from './multiple_selection'
import { observable } from 'mobx'

const store = observable({
  selected: [
    { value: 1, text: '小明' },
    { value: 2, text: '小红' },
  ],
  setSelected(selected: any) {
    console.log(selected)
    this.selected = selected
  },
})

export const ComMultipleSelection = () => (
  <div>
    <MultipleSelection
      selected={[]}
      onSelect={(selected) => {
        store.setSelected(selected)
      }}
      placeholder='请选择'
    />
    <MultipleSelection
      selected={store.selected.slice()}
      onSelect={(selected) => {
        store.setSelected(selected)
      }}
      placeholder='请选择'
    />
  </div>
)

export default {
  title: '其他/MultipleSelection',
}
