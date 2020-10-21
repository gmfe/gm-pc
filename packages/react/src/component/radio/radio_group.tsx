import React, { CSSProperties, FC, HTMLAttributes } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import { RadioGroupContext } from './util'

interface RadioGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string | number
  onChange?: (value: string | number) => void
  name?: string
  className?: string
  style?: CSSProperties
}

const RadioGroup: FC<RadioGroupProps> = ({
  value,
  onChange = _.noop,
  name,
  className,
  children,
  ...rest
}) => {
  const handleChange = (rValue: string | number): void => {
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
