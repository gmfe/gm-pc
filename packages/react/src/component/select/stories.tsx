import React from 'react'
import Select from './select'
import { observable } from 'mobx'

const list = [
  {
    value: 0,
    text: '南山',
  },
  {
    value: 1,
    text: '福田',
  },
  {
    value: 2,
    text: '宝安',
  },
  {
    value: 3,
    text: '宝安不可用',
    disabled: true,
  },
  {
    value: 3,
    text: '罗湖',
  },
]

const store = observable({
  value: 0,
  setValue(value: number) {
    this.value = value
  },
})

export const ComSelect = () => (
  <div>
    <Select
      data={list}
      value={store.value}
      onChange={(value) => store.setValue(value!)}
    />
    <div>disabled</div>
    <Select
      data={list}
      value={store.value}
      onChange={(value) => store.setValue(value!)}
      disabled
    />
    <div>canShowClose</div>
    <Select
      data={list}
      value={store.value}
      onChange={(value) => store.setValue(value!)}
      canShowClose
    />
    <div>clean</div>
    <Select
      clean
      data={list}
      value={store.value}
      onChange={(value) => store.setValue(value!)}
    />
  </div>
)

export default {
  title: '表单/Select',
}
