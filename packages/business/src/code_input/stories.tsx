import React, { ChangeEvent } from 'react'
import { observable } from 'mobx'
import { Input } from '@gm-pc/react'

import CodeInput from './code_input'

const store = observable({
  value: '',
  code: '',
  code_value: '111',
  setValue(v: string) {
    this.value = v
  },
  setCode(v: string) {
    this.code = v
  },
  setCodeValue(v: string) {
    this.code_value = v
  },
})

export const ComCodeInput = () => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    store.setValue(e.target.value)
  }

  const handleCodeChange = (value: string) => {
    store.setCode(value)
  }

  const handleCodeValueChange = (value: string) => {
    store.setCodeValue(value)
  }

  return (
    <>
      <div>编码为空</div>
      <div>
        名称：
        <Input value={store.value} onChange={handleChange} />
      </div>
      <div>
        编码：
        <CodeInput value={store.code} text={store.value} onChange={handleCodeChange} />
      </div>
      <div className='gm-margin-top-20'>编码不为空</div>
      <div>
        名称：
        <Input value={store.value} onChange={handleChange} />
      </div>
      <div>
        编码：
        <CodeInput
          needTextChange={false}
          value={store.code_value}
          text={store.value}
          onChange={handleCodeValueChange}
        />
      </div>
    </>
  )
}

export default {
  title: 'Business/CodeInput',
}
