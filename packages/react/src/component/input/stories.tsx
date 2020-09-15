import React from 'react'
import Input from './input'
import InputClose from './input_close'
import { observable } from 'mobx'

const store = observable({
  value: 'a',
})

export const ComInput = () => {
  return (
    <div className='gm-padding-10' style={{ width: '200px' }}>
      <Input
        placeholder='请输入'
        value={store.value}
        onChange={(e) => {
          store.value = e.target.value
        }}
      />
      <Input
        placeholder='请输入'
        value={store.value}
        onChange={(e) => {
          store.value = e.target.value
        }}
        disabled
      />
    </div>
  )
}

export const ComInputClose = () => {
  return (
    <div className='gm-padding-10' style={{ width: '200px' }}>
      <InputClose
        placeholder='请输入'
        value={store.value}
        onChange={(value: string) => {
          store.value = value
        }}
      />
      <InputClose
        placeholder='请输入'
        value={store.value}
        onChange={(value: string) => {
          store.value = value
        }}
        disabled
      />
    </div>
  )
}

export default {
  title: '表单/Input',
}
