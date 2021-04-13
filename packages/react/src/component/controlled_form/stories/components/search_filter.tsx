import React, { FC, useState } from 'react'
import _ from 'lodash'
import { Select, Input, Flex, ControlledFormItem } from '../../../../index'

const orderSearchType = [
  {
    value: 1,
    text: '按订单号',
    key: 'serial_no',
    desc: '输入订单号搜索',
  },
  {
    value: 2,
    text: '按商户',
    key: 'receive_customer_id',
    desc: '输入商户编码或商户名',
  },
]

interface SearchFilterProps {
  selected?: 1 | 2
}

export const SearchFilter: FC<SearchFilterProps> = ({ selected = 1 }) => {
  const list = [...orderSearchType]
  const target = _.find(list, (v) => v.value === selected)

  return (
    <Flex>
      <div className='gm-padding-right-5' style={{ minWidth: '90px' }}>
        <ControlledFormItem name='searchType' disabledCol>
          <Select clean className='gm-block' data={list} />
        </ControlledFormItem>
      </div>
      <Flex flex none column style={{ minWidth: 'auto' }}>
        <ControlledFormItem name='serial_no' colWidth='290px'>
          <Input className='form-control' placeholder={target?.desc} />
        </ControlledFormItem>
      </Flex>
    </Flex>
  )
}

export default SearchFilter
