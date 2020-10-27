import React, { ChangeEvent, useEffect, forwardRef, useRef } from 'react'
import { Input, InputProps } from '@gm-pc/react'

import { getCustomizedCode } from './util'

interface CodeInputProps extends Omit<InputProps, 'onChange'> {
  text?: string
  onChange?(value: string): void
  /** 是否需要随text变化 */
  needTextChange?: boolean
}

// 一旦本身输入修改，就不再根据外层变动
const CodeInput = forwardRef<HTMLInputElement, CodeInputProps>(
  ({ text, onChange, needTextChange = true, ...rest }, ref) => {
    // 记录当前自身是否编辑
    const changed = useRef<boolean>(false)
    const random = useRef<number>(Math.floor(Math.random() * 10000))

    useEffect(() => {
      if (!changed.current && needTextChange) {
        const new_value: string = getCustomizedCode(text || '').trim()
        const code: string = new_value ? `${new_value}${random.current}` : new_value
        onChange && onChange(code)
      }
    }, [text, needTextChange])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      changed.current = true
      onChange && onChange(e.target.value)
    }

    return <Input {...rest} ref={ref} onChange={handleChange} />
  }
)

export default CodeInput
export type { CodeInputProps }
