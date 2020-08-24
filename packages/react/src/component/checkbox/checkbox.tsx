import React, { FC, ChangeEvent, useContext, HTMLAttributes } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import { CheckboxGroupContext } from './util'

interface CheckboxProps extends HTMLAttributes<HTMLLabelElement> {
  value?: any
  checked?: boolean
  onChange?: (event: ChangeEvent<HTMLLabelElement>) => void
  disabled?: boolean
  indeterminate?: boolean
  name?: string
}

const Checkbox: FC<CheckboxProps> = ({
  value,
  checked,
  onChange,
  children,
  name,
  disabled,
  indeterminate,
  className,
  style,
  ...rest
}) => {
  const checkBoxGroupContext = useContext(CheckboxGroupContext)

  const handleChange = (event: ChangeEvent<HTMLLabelElement>) => {
    onChange && onChange(event)

    // 代表在 CheckBoxGroup 下
    if (checkBoxGroupContext.isInCheckboxGroup) {
      checkBoxGroupContext.onChange(value)
    }
  }

  let oName = name
  let oChecked = checked

  if (checkBoxGroupContext.isInCheckboxGroup) {
    oName = checkBoxGroupContext.name
    oChecked = checkBoxGroupContext.value.includes(value)

    if (checked !== undefined || name !== undefined || onChange !== undefined) {
      console.warn('在 CheckBoxGroup 下，不能提供 checked name onChange')
    }
  }

  return (
    <label
      {...rest}
      className={classNames(
        'gm-checkbox',
        {
          'gm-checkbox-indeterminate': !checked && indeterminate,
          disabled,
        },
        className
      )}
      onChange={handleChange}
    >
      <input
        className='gm-checkbox-input'
        type='checkbox'
        name={oName}
        value={value}
        checked={oChecked}
        disabled={disabled}
        // eslint-disable-next-line
        onChange={_.noop}
      />
      <span className='gm-checkbox-span' />
      <span className='gm-padding-lr-5'>{children}</span>
    </label>
  )
}

export default Checkbox
export type { CheckboxProps }
