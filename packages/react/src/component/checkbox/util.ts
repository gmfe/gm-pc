import React from 'react'
import _ from 'lodash'

interface CheckboxGroupContext {
  /** 用来表示 Checkbox 被 CheckboxGroup 包着 */
  isInCheckboxGroup: boolean
  value: any[]
  name?: string
  onChange: (value: any) => void
}

const CheckboxGroupContext = React.createContext<CheckboxGroupContext>({
  isInCheckboxGroup: false,
  value: [],
  name: undefined,
  onChange: _.noop,
})

export { CheckboxGroupContext }
