import React, { CSSProperties, FC, HTMLAttributes } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import { RadioGroupContext } from './util'

// @ts-ignore
interface RadioGroupProps extends HTMLAttributes<HTMLDivElement> {
  value?: any
  onChange?: (value: any) => void
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
  const handleChange = (rValue: any): void => {
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
