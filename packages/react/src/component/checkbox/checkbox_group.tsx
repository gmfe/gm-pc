import React, { CSSProperties, FC, HTMLAttributes } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import { CheckboxGroupContext } from './util'

type Value = string | number

// @ts-ignore
interface CheckboxGroupProps extends HTMLAttributes<HTMLDivElement> {
  value: Value[]
  onChange?: (value: Value[]) => void
  name?: string
  className?: string
  style?: CSSProperties
}

const CheckboxGroup: FC<CheckboxGroupProps> = ({
  value,
  onChange = _.noop,
  name,
  className,
  children,
  ...rest
}) => {
  const handleChange = (cValue: Value): void => {
    if (value.includes(cValue)) {
      onChange(_.without(value, cValue))
    } else {
      onChange([...value, cValue])
    }
  }

  return (
    <div {...rest} className={classNames('gm-checkbox-group', className)}>
      <CheckboxGroupContext.Provider
        value={{
          isInCheckboxGroup: true,
          value,
          onChange: handleChange,
          name,
        }}
      >
        {children}
      </CheckboxGroupContext.Provider>
    </div>
  )
}

export default CheckboxGroup
export type { CheckboxGroupProps }
