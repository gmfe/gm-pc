import React, { ChangeEvent, FC, HTMLAttributes } from 'react'
import classNames from 'classnames'

// 这里怎么解决，先 ts-ignore
// @ts-ignore
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
      onChange={onChange}
    >
      <input
        type='radio'
        className='gm-radio-input'
        name={name}
        value={value}
        checked={checked || false}
        disabled={disabled}
      />
      <span className='gm-radio-span' />
      <span className='gm-padding-lr-5'>{children}</span>
    </label>
  )
}

export default Radio
export type { RadioProps }
