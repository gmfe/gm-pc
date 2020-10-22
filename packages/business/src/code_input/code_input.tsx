import React, { ChangeEvent, useEffect, useState, forwardRef, useRef } from 'react'
import { Input, InputProps } from '@gm-pc/react'

import { getCustomizedCode } from './util'

interface CodeInputProps extends Omit<InputProps, 'value'> {
  text: string
}

// 一旦本身输入修改，就不再根据外层变动
const CodeInput = forwardRef<HTMLInputElement, CodeInputProps>(
  ({ text, onChange, ...rest }, ref) => {
    const [value, setValue] = useState<string>('')
    // 记录当前自身是否编辑
    const changed = useRef<boolean>(false)

    useEffect(() => {
      if (!changed.current) {
        setValue(getCustomizedCode(text))
      }
    }, [text, changed])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const new_value = e.target.value.trim()
      changed.current = true
      setValue(new_value)
      onChange && onChange(e)
    }

    return <Input {...rest} ref={ref} value={value} onChange={handleChange} />
  }
)

export default CodeInput
export type { CodeInputProps }
