import React from 'react'
import _ from 'lodash'

interface CheckboxGroupContext<V> {
  /** 用来表示 Checkbox 被 CheckboxGroup 包着 */
  isInCheckboxGroup: boolean
  value: V[]
  name?: string
  onChange: (value: V) => void
}

const CheckboxGroupContext = React.createContext<CheckboxGroupContext<any>>({
  isInCheckboxGroup: false,
  value: [],
  name: undefined,
  onChange: _.noop,
})

export { CheckboxGroupContext }
