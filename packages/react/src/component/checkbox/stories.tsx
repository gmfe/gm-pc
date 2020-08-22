import React from 'react'
import { Checkbox, CheckboxGroup } from './index'
import { observable } from 'mobx'

const store = observable({
  value: [1, 4],
  data: [
    {
      value: 1,
      text: '广州',
    },
    {
      value: 2,
      text: '深圳',
      disabled: true,
    },
    {
      value: 3,
      text: '成都',
    },
    {
      value: 4,
      text: '东莞',
      disabled: true,
    },
  ],
  setValue(value: any) {
    console.log(value)
    this.value = value
  },
  checked: false,
  setChecked() {
    this.checked = !this.checked
  },
})

export const ComCheckbox = () => (
  <div>
    <div>
      <div>默认</div>
      <Checkbox
        checked={store.checked}
        onChange={() => {
          store.setChecked()
        }}
      >
        选中 checked true
      </Checkbox>
      <Checkbox
        checked={!store.checked}
        onChange={() => {
          store.setChecked()
        }}
      >
        checked false
      </Checkbox>
      <Checkbox
        indeterminate
        checked={store.checked}
        onChange={() => {
          store.setChecked()
        }}
      >
        checked indeterminate
      </Checkbox>
    </div>
    <div>
      <div>disabled</div>
      <Checkbox checked disabled>
        checked true
      </Checkbox>
      <Checkbox disabled>checked false</Checkbox>
      <Checkbox indeterminate disabled>
        checked indeterminate
      </Checkbox>
    </div>
  </div>
)

export const ComCheckboxGroup = () => (
  <CheckboxGroup
    name='city'
    value={store.value}
    onChange={(value) => store.setValue(value)}
  >
    {store.data.map((v) => (
      <Checkbox key={v.value} value={v.value} disabled={v.disabled}>
        {v.text}
      </Checkbox>
    ))}
  </CheckboxGroup>
)

// export const ComCheckboxGroupFor

export default {
  title: '表单/Checkbox',
}
