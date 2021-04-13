import React, { CSSProperties, HTMLAttributes } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import { RadioGroupContext } from './util'
import Radio, { RadioProps } from './radio'
interface RadioGroupProps<V> extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: V
  onChange?: (value: V) => void
  name?: string
  options: RadioProps<V>[]
  className?: string
  style?: CSSProperties
}

function RadioGroup<V = any>({
  value,
  onChange = _.noop,
  name,
  options = [],
  className,
  children,
  ...rest
}: RadioGroupProps<V>) {
  const handleChange = (rValue: V): void => {
    console.log(value)
    onChange(rValue)
  }
  const isOptions = options?.length > 0
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
        {isOptions
          ? options.map((option, index) => <Radio {...option} key={index} />)
          : children}
      </RadioGroupContext.Provider>
    </div>
  )
}

export default RadioGroup
export type { RadioGroupProps }
