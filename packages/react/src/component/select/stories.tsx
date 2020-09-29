import React from 'react'
import Select from './select'
import { observable } from 'mobx'

const list = [
  {
    value: 1,
    text: '南山',
  },
  {
    value: 2,
    text: '福田',
  },
  {
    value: 3,
    text: '宝安',
  },
  {
    value: 4,
    text: '宝安不可用',
    disabled: true,
  },
  {
    value: 5,
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
      all
      allText='全部小组'
      placeholder='全部小组'
      value={store.value}
      onChange={(value) => {
        console.log({ value })
        return store.setValue(value!)
      }}
    />
    <div>disabled</div>
    <Select
      data={list}
      all
      value={store.value}
      onChange={(value) => store.setValue(value!)}
      disabled
    />
    <div>canShowClose</div>
    <Select
      data={list}
      placeholder='请选择一个地址'
      value={store.value}
      onChange={(value) => {
        console.log({ value })
        store.setValue(value!)
      }}
      canShowClose
    />
    <div>clean</div>
    <Select
      clean
      all
      data={list}
      value={store.value}
      onChange={(value) => store.setValue(value!)}
    />
  </div>
)

export default {
  title: '表单/Select',
}
