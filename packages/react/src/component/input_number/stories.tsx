import React from 'react'
import InputNumber from './input_number'
import { observable } from 'mobx'

const store = observable({
  value: null,
  setValue(value: number | null) {
    // @ts-ignore
    this.value = value
  },
})

export const ComInputNumber = () => (
  <div style={{ width: '200px' }}>
    <InputNumber
      value={store.value}
      onChange={(value) => {
        store.setValue(value)
      }}
      min={0}
    />
  </div>
)

export default {
  title: '表单/InputNumber',
}
