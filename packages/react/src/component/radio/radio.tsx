import React, { ChangeEvent, FC, HTMLAttributes, useContext } from 'react'
import classNames from 'classnames'
import { RadioGroupContext } from './util'

interface RadioProps extends Omit<HTMLAttributes<HTMLLabelElement>, 'onChange'> {
  value?: any
  checked?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
    >
      <input
        type='radio'
        className='gm-radio-input'
        name={oName}
        value={value}
        checked={oChecked}
        disabled={disabled}
        // eslint-disable-next-line
        onChange={handleChange}
      />
      <span className='gm-radio-span' />
      <span className='gm-padding-lr-5'>{children}</span>
    </label>
  )
}

export default Radio
export type { RadioProps }
