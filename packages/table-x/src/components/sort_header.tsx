import React, { FC, HTMLAttributes, MouseEvent } from 'react'
import classNames from 'classnames'
import { SortHeaderDirectionType } from '../base/types'
import { Flex } from '@gm-pc/react'

export interface SortHeaderProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'onChange'> {
  type?: SortHeaderDirectionType
  onClick?(event: MouseEvent<HTMLSpanElement>): void
  onChange?(type: SortHeaderDirectionType): void
}

const SortHeader: FC<SortHeaderProps> = ({
  type,
  onClick,
  className,
  onChange,
  ...rest
}) => {
  const handleClick = (event: MouseEvent<HTMLSpanElement>): void => {
    onClick && onClick(event)
    if (!onChange) {
      return
    }

    if (!type) {
      onChange('asc')
    } else if (type === 'asc') {
      onChange('desc')
    } else if (type === 'desc') {
      onChange(null)
    }
  }

  return (
    <span
      {...rest}
      onClick={handleClick}
      className={classNames(
        'gm-table-x-sort-header gm-cursor',
        {
          'gm-table-x-sort-header-asc': type === 'asc',
          'gm-table-x-sort-header-desc': type === 'desc',
        },
        className
      )}
    />
  )
}

export default SortHeader
