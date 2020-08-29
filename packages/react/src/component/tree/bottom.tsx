import { getLocale } from '@gm-pc/locales'
import React, { FC, useMemo } from 'react'
import { Flex } from '../flex'
import { Checkbox } from '../checkbox'
import { getLeafValues } from './util'
import { BottomProps } from './types'

const Bottom: FC<BottomProps> = ({ list, selectedValues, onChange }) => {
  const leafValues = useMemo(() => {
    return getLeafValues(list)
  }, [list])

  const checkedAll =
    leafValues.length !== 0 && leafValues.length === selectedValues.length
  const isIndeterminate =
    selectedValues.length !== 0 && selectedValues.length < leafValues.length

  return (
    <Flex justifyBetween alignCenter className='gm-border-top gm-padding-5'>
      <Checkbox
        checked={checkedAll}
        indeterminate={isIndeterminate}
        onChange={() => onChange(!checkedAll)}
      >
        {getLocale('全选')}
      </Checkbox>
      <div className='gm-padding-lr-5 gm-text-desc'>
        {selectedValues.length}/{leafValues.length}
      </div>
    </Flex>
  )
}

export default Bottom
