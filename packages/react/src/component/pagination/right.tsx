import React, { useState, useEffect, FC, KeyboardEvent } from 'react'
import { InputNumber } from '../input_number'
import { Flex } from '../flex'
import { InnerProps } from './types'
import { getIndex } from './util'

const Right: FC<InnerProps> = ({ paging, onChange }) => {
  const [index, setIndex] = useState<number>(getIndex(paging))

  // 响应外部的 index 变化
  useEffect(() => {
    setIndex(getIndex(paging))
  }, [paging.offset, paging.limit])

  const handleInput = (value: number) => {
    setIndex(value)
  }

  const doEnsureIndex = () => {
    // 如果不合理，则还原
    if (index === null) {
      setIndex(getIndex(paging))
      return
    }

    onChange({
      ...paging,
      offset: (index - 1) * paging.limit,
    })
  }

  const handleBlur = () => {
    doEnsureIndex()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      doEnsureIndex()
    }
  }

  const all = Math.ceil((paging.count || 0) / paging.limit)

  return (
    <Flex className='gm-pagination-right'>
      <InputNumber
        precision={0}
        value={index}
        onChange={handleInput}
        min={1}
        max={all}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className='form-control'
        style={{ width: '40px' }}
      />
      <div className='gm-pagination-right-total-page'>{`/${all}页`}</div>
    </Flex>
  )
}

export default Right
