import React, { ChangeEvent } from 'react'
import { observable } from 'mobx'
import { Input } from '@gm-pc/react'

import CodeInput from './code_input'

const store = observable({
  value: '',
  code: '',
  setValue(v: string) {
    this.value = v
  },
  setCode(v: string) {
    this.code = v
  },
})

export const ComCodeInput = () => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    store.setValue(e.target.value)
  }

  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    store.setCode(e.target.value.trim())
  }

  return (
    <>
      <div>
        名称：
        <Input value={store.value} onChange={handleChange} />
      </div>
      <div>
        编码：
        <CodeInput text={store.value} onChange={handleCodeChange} />
      </div>
    </>
  )
}

export default {
  title: 'Business/CodeInput',
}
