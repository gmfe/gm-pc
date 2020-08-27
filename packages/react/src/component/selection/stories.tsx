import React from 'react'
import Selection from './selection'

export const ComSelection = () => (
  <div>
    <Selection onSelect={(selected) => console.log(selected)} placeholder='请选择' />
    <div>disabled</div>
    <Selection
      disabled
      selected={{ value: 0, text: '选中项' }}
      onSelect={(selected) => console.log(selected)}
      placeholder='请选择'
    />
    <div>renderSelected</div>
    <Selection
      selected={{ value: 0, text: '选中项' }}
      onSelect={(selected) => console.log(selected)}
      renderSelected={(item) => item.text + 'lalala'}
    />
    <div>clean</div>
    <Selection
      clean
      selected={{ value: 0, text: '选中项' }}
      onSelect={(selected) => console.log(selected)}
      placeholder='请选择'
    />
    <div>disabledClose</div>
    <Selection
      disabledClose
      selected={{ value: 0, text: '选中项' }}
      onSelect={(selected) => console.log(selected)}
      placeholder='请选择'
    />
    <div>noInput</div>
    <Selection
      onSelect={(selected) => console.log(selected)}
      placeholder='请选择'
      noInput
    />
  </div>
)

export default {
  title: '其他/Selection',
}
