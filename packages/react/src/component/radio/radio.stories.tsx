import React from 'react'
import { Radio } from './'
import { observable } from 'mobx'

const store = observable({
  value: 3,
  data: [
    {
      value: 1,
      text: '广州',
    },
    {
      value: 2,
      text: '深圳',
    },
    {
      value: 3,
      text: '成都',
      disabled: true,
    },
  ],
  setValue(value: any) {
    console.log(value)
    this.value = value
  },
  checked: false,
  setChecked(checked: any) {
    console.log('setChecked', checked)
    this.checked = checked
  },
})

export const ComRadio = () => (
  <div>
    <div>
      <h1>默认</h1>
      <Radio
        checked={store.checked}
        onChange={() => {
          store.setValue(!store.checked)
        }}
      >
        radio
      </Radio>
      <Radio
        checked={store.checked}
        onChange={() => {
          store.setValue(!store.checked)
        }}
      >
        radio
      </Radio>
    </div>
    <div>
      <h1>disabled</h1>
      <Radio checked disabled>
        radio
      </Radio>
      <Radio disabled>radio</Radio>
    </div>
    <div>更多同 checkbox</div>
  </div>
)

export default {
  title: '表单/Radio',
}
