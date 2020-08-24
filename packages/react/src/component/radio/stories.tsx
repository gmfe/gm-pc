import React from 'react'
import Radio from './radio'
import RadioGroup from './radio_group'
import _ from 'lodash'
import { observable } from 'mobx'
import { Col, Row } from '../grid'

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
          store.setChecked(!store.checked)
        }}
      >
        radio
      </Radio>
      <Radio
        checked={!store.checked}
        onChange={() => {
          store.setChecked(!store.checked)
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

export const ComRadioGroupForGrid = () => {
  const two = _.groupBy(store.data, (v) => Math.floor((v.value - 1) / 2))
  console.log(two)
  return (
    <div>
      <div>垂直布局</div>
      <div>
        <RadioGroup value={store.value} onChange={(value) => store.setValue(value)}>
          {_.map(store.data, (v) => (
            <div key={v.value}>
              <Radio value={v.value}>{v.text}</Radio>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div>两列</div>
      <div style={{ width: '200px' }}>
        <RadioGroup value={store.value} onChange={(value) => store.setValue(value)}>
          {_.map(two, (one, oneK) => (
            <Row key={oneK}>
              {_.map(one, (v) => (
                <Col span={8} key={v.value}>
                  <Radio value={v.value}>{v.text}</Radio>
                </Col>
              ))}
            </Row>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}

export default {
  title: '表单/Radio',
}
