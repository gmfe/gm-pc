import React, { CSSProperties, HTMLAttributes } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import { RadioGroupContext } from './util'

interface RadioGroupProps<V> extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: V
  onChange?: (value: V) => void
  name?: string
  className?: string
  style?: CSSProperties
}

function RadioGroup<V = any>({
  value,
  onChange = _.noop,
  name,
  className,
  children,
  ...rest
}: RadioGroupProps<V>) {
  const handleChange = (rValue: V): void => {
    onChange(rValue)
  }

  return (
    <div {...rest} className={classNames('gm-radio-group', className)}>
      <RadioGroupContext.Provider
        value={{
          isInRadioGroup: true,
          value,
          onChange: handleChange,
          name,
        }}
      >
        {children}
      </RadioGroupContext.Provider>
    </div>
  )
}

export default RadioGroup
export type { RadioGroupProps }
