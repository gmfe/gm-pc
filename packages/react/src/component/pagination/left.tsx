import React, { FC } from 'react'
import { Select } from '../select'
import { Flex } from '../flex'
import { PaginationProps } from './types'
import _ from 'lodash'

function getLimitData(limit: number) {
  const limitData = [
    { value: limit, text: limit + '' },
    { value: 10, text: '10' },
    { value: 20, text: '20' },
    { value: 50, text: '50' },
  ]

  return _.uniqBy(limitData, (v) => v.value)
}

const Left: FC<PaginationProps> = ({ paging, onChange }) => {
  const { need_count, count, limit } = paging

  const handleChange = (limit: number) => {
    onChange({
      ...paging,
      // 改变页码需要回到第一页
      offset: 0,
      limit,
    })
  }

  return (
    <Flex alignCenter>
      {need_count && <span>共{count}条记录,&nbsp;</span>}
      <span>每页&nbsp;</span>
      <Select
        data={getLimitData(limit)}
        value={limit}
        onChange={handleChange}
        style={{ width: '60px' }}
      />
      <span>&nbsp;条</span>
    </Flex>
  )
}

export default Left
