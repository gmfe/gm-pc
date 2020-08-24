import React, { ChangeEvent, FC, HTMLAttributes, useContext } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import { RadioGroupContext } from './util'

interface RadioProps extends HTMLAttributes<HTMLLabelElement> {
  value?: any
  checked?: boolean
  onChange?: (event: ChangeEvent<HTMLLabelElement>) => void
  disabled?: boolean
  name?: string
}

const Radio: FC<RadioProps> = ({
  value,
  checked,
  onChange,
  onClick,
  children,
  name,
  disabled,
  className,
  ...rest
}) => {
  const radioGroupContext = useContext(RadioGroupContext)

  const handleChange = (event: ChangeEvent<HTMLLabelElement>) => {
    onChange && onChange(event)

    if (radioGroupContext.isInRadioGroup) {
      radioGroupContext.onChange(value)
    }
  }

  let oName = name
  let oChecked = checked

  if (radioGroupContext.isInRadioGroup) {
    oName = radioGroupContext.name
    oChecked = radioGroupContext.value === value

    if (checked !== undefined || name !== undefined || onChange !== undefined) {
      console.warn('在 RadioGroup 下，不能提供 checked name onChange')
    }
  }

  return (
    <label
      {...rest}
      className={classNames(
        'gm-radio',
        {
          disabled,
        },
        className
      )}
      onChange={handleChange}
    >
      <input
        type='radio'
        className='gm-radio-input'
        name={oName}
        value={value}
        checked={oChecked}
        disabled={disabled}
        // eslint-disable-next-line
        onChange={_.noop}
      />
      <span className='gm-radio-span' />
      <span className='gm-padding-lr-5'>{children}</span>
    </label>
  )
}

export default Radio
export type { RadioProps }
