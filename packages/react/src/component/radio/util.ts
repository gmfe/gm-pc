import React from 'react'
import _ from 'lodash'

interface RadioGroupContext {
  /** 用来表示 Radio 被 RadioGroup 包着 */
  isInRadioGroup: boolean
  value?: string | number
  name?: string
  onChange: (value: string | number) => void
}

const RadioGroupContext = React.createContext<RadioGroupContext>({
  isInRadioGroup: false,
  value: undefined,
  name: undefined,
  onChange: _.noop,
})

export { RadioGroupContext }
