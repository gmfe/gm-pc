import React from 'react'
import Select from './select'
import { observable } from 'mobx'
import Flex from '../flex/flex'

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
    <div>
      <h3>基础</h3>
      <Select
        data={list}
        value={store.value}
        onChange={(value) => {
          console.log({ value })
          return store.setValue(value!)
        }}
      />
    </div>
    <Flex>
      <div>
        <h3>选择全部</h3>
        <Select
          data={list}
          all
          placeholder='select'
          value={store.value}
          onChange={(value) => {
            console.log({ value })
            return store.setValue(value!)
          }}
        />
      </div>
      <div className='gm-margin-left-10'>
        <h3>自定义全部文案</h3>
        <Select
          data={list}
          all
          allText='😊全部地址😊'
          value={store.value}
          onChange={(value) => {
            console.log({ value })
            return store.setValue(value!)
          }}
        />
      </div>
    </Flex>
    <div>
      <h3>disabled</h3>
      <Select
        data={list}
        all
        value={store.value}
        onChange={(value) => store.setValue(value!)}
        disabled
      />
    </div>
    <h3>clean</h3>
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
