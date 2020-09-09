import React from 'react'
import Input from './input'
import { observable } from 'mobx'

const store = observable({
  value: '',
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
    </div>
  )
}

export default {
  title: '表单/Input',
}
