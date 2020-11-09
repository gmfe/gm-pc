import React from 'react'
import TextArea from './textarea'
import { observable } from 'mobx'

const store = observable({
  value: 'a',
})

export const ComInput = () => {
  return (
    <div>
      <div className='gm-padding-10' style={{ width: '200px' }}>
        <TextArea
          placeholder='请输入'
          value={store.value}
          onChange={(e) => {
            store.value = e.target.value
          }}
        />
      </div>
      <div className='gm-padding-10' style={{ width: '200px' }}>
        <TextArea
          disabled
          placeholder='请输入'
          value={store.value}
          onChange={(e) => {
            store.value = e.target.value
          }}
        />
      </div>
    </div>
  )
}

export default {
  title: '表单/TextArea',
}
