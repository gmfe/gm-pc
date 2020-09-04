import React, { useState, useEffect, FC, KeyboardEvent, useRef } from 'react'
import { InputNumber } from '../input_number'
import { Flex } from '../flex'
import { PaginationProps } from './types'
import { getIndex } from './util'

const Right: FC<PaginationProps> = ({ paging, onChange }) => {
  const [index, setIndex] = useState<number>(getIndex(paging))

  // input focus 的时候存起来，blur 的时候如果一样就不更新
  const refIndex = useRef<number | null>(null)

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

  const handleFocus = () => {
    refIndex.current = index
  }

  const handleBlur = () => {
    // 和 focus 一样，值没变，就不触发更新了
    if (index === refIndex.current) {
      return
    }

    refIndex.current = index

    doEnsureIndex()
  }

  // TODO useKeyPress
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
        onFocus={handleFocus}
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
