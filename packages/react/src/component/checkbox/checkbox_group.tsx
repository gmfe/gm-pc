import React, { CSSProperties, HTMLAttributes } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import { CheckboxGroupContext } from './util'
import Checkbox, { CheckboxProps } from './checkbox'
interface CheckboxGroupProps<V> extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: V[]
  onChange?: (value: V[]) => void
  name?: string
  className?: string
  style?: CSSProperties
  options?: CheckboxProps<V>[]
}

function CheckboxGroup<V = any>({
  value = [],
  onChange = _.noop,
  name,
  className,
  options = [],
  children,
  ...rest
}: CheckboxGroupProps<V>) {
  const handleChange = (cValue: V): void => {
    if (value?.includes(cValue)) {
      onChange(_.without(value, cValue))
    } else {
      onChange([...value, cValue])
    }
  }
  const isOptions = options.length > 0
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
        {isOptions
          ? options.map((option, index) => <Checkbox {...option} key={index} />)
          : children}
      </CheckboxGroupContext.Provider>
    </div>
  )
}

export default CheckboxGroup
export type { CheckboxGroupProps }
