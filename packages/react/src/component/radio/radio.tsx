import React, { ChangeEvent, HTMLAttributes, useContext } from 'react'
import classNames from 'classnames'
import { RadioGroupContext } from './util'

interface RadioProps<V> extends Omit<HTMLAttributes<HTMLLabelElement>, 'onChange'> {
  value?: V
  checked?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  name?: string
}

function Radio<V = any>({
  value,
  checked,
  onChange,
  onClick,
  children,
  name,
  disabled,
  className,
  ...rest
}: RadioProps<V>) {
  const radioGroupContext = useContext(RadioGroupContext)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event)

    if (radioGroupContext.isInRadioGroup) {
      radioGroupContext.onChange(value!)
    }
  }

  let oName = name
  let oChecked = checked

  if (radioGroupContext.isInRadioGroup) {
    oName = radioGroupContext.name
    oChecked = radioGroupContext.value && radioGroupContext.value === value

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
        checked={oChecked}
        disabled={disabled}
        onChange={handleChange}
      />
      <span className='gm-radio-span' />
      <span className='gm-padding-lr-5'>{children}</span>
    </label>
  )
}

export default Radio
export type { RadioProps }
