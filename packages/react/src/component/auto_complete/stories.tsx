import React, { useState } from 'react'
import AutoComplete, { AutoCompleteOption } from './auto_complete'

const tips: AutoCompleteOption[] = [
  { value: '自动填充文本' },
  { value: '自动填充文本2' },
  { value: '自动填充文本3' },
]

export const ComAutoComplete = () => {
  const [value, setValue] = useState('')

  return (
    <div style={{ width: 300 }}>
      <AutoComplete value={value} options={tips} onChange={setValue} />
      <br />
      <br />
      <br />
      <AutoComplete
        value={value}
        options={tips}
        onChange={setValue}
        addonOptionsBefore={() => {
          return (
            <span style={{ display: 'block', padding: '4px 10px', color: '#888' }}>
              最近几条输入记录：
            </span>
          )
        }}
      />
    </div>
  )
}

export default {
  title: '表单/AutoComplete',
}
