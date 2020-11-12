import React from 'react'
import _ from 'lodash'

interface RadioGroupContext<V> {
  /** 用来表示 Radio 被 RadioGroup 包着 */
  isInRadioGroup: boolean
  value?: V
  name?: string
  onChange: (value: V) => void
}

const RadioGroupContext = React.createContext<RadioGroupContext<any>>({
  isInRadioGroup: false,
  value: undefined,
  name: undefined,
  onChange: _.noop,
})

export { RadioGroupContext }
