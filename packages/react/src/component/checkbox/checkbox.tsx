import React, { ChangeEvent, useContext, HTMLAttributes } from 'react'
import classNames from 'classnames'
import { CheckboxGroupContext } from './util'

interface CheckboxProps<V> extends Omit<HTMLAttributes<HTMLLabelElement>, 'onChange'> {
  value?: V
  checked?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  indeterminate?: boolean
  name?: string
}

function Checkbox<V = any>({
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
}: CheckboxProps<V>) {
  const checkBoxGroupContext = useContext(CheckboxGroupContext)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event)

    // 代表在 CheckBoxGroup 下
    if (checkBoxGroupContext.isInCheckboxGroup) {
      checkBoxGroupContext.onChange(value!)
    }
  }

  let oName = name
  let oChecked = checked

  if (checkBoxGroupContext.isInCheckboxGroup) {
    oName = checkBoxGroupContext.name
    oChecked = checkBoxGroupContext.value?.includes(value!)
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
    >
      <input
        className='gm-checkbox-input'
        type='checkbox'
        name={oName}
        checked={oChecked}
        disabled={disabled}
        onChange={handleChange}
      />
      <span className='gm-checkbox-span' />
      {children && <span className='gm-padding-lr-5'>{children}</span>}
    </label>
  )
}

export default Checkbox
export type { CheckboxProps }
