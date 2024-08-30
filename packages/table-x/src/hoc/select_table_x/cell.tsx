import React, { FC } from 'react'
import _ from 'lodash'
import { SelectTableXCellProps } from './types'
import SelectTableXContext from './context'
import { Checkbox, Radio } from '@gm-pc/react'

const returnFalse = () => false

const SelectCell: FC<SelectTableXCellProps> = ({
  selectType,
  keyField,
  isSelectorDisable = returnFalse,
  row,
}) => {
  const value = row.original[keyField]

  return (
    <SelectTableXContext.Consumer>
      {({ selected, onSelect }) => {
        const isChecked = selected.includes(value)
        const disabled = isSelectorDisable(row.original)
        if (selectType === 'checkbox') {
          return (
            <Checkbox
              className='gm-table-x-select'
              disabled={disabled}
              checked={isChecked}
              onClick={(e) => {
                e.stopPropagation()
              }}
              onChange={() => {
                onSelect(_.xor(selected, [value]), !isChecked, row.index)
              }}
            />
          )
        } else {
          return (
            <Radio
              className='gm-table-x-select'
              disabled={disabled}
              checked={isChecked}
              onClick={(e) => {
                e.stopPropagation()
              }}
              onChange={() => {
                onSelect(isChecked ? [] : [value], !isChecked, row.index)
              }}
            />
          )
        }
      }}
    </SelectTableXContext.Consumer>
  )
}

export default SelectCell
