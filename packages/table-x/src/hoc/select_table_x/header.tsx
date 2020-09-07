import React, { FC, memo } from 'react'
import { SelectTableXHeaderProps } from './types'
import SelectTableXContext from './context'
import { Checkbox } from '@gm-pc/react'

const SelectHeader: FC<SelectTableXHeaderProps> = ({ selectType }) => {
  if (selectType !== 'checkbox') {
    return null
  }
  return (
    <SelectTableXContext.Consumer>
      {({ isSelectAll, onSelectAll }) => (
        <Checkbox
          onChange={onSelectAll}
          checked={isSelectAll}
          className='gm-table-x-select'
        />
      )}
    </SelectTableXContext.Consumer>
  )
}

export default memo(SelectHeader)
