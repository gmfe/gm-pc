import React, { FC, ChangeEvent, useRef, useState } from 'react'
import _ from 'lodash'

import { useFilterData } from './hooks/use_filter_data'
import { Input } from '../input'
import { Popover } from '../popover'
import { Flex } from '../flex'
import { Loading } from '../loading'
import { ListBase } from '../list'
import { SearchSelectProps, SearchSelectListProps } from './types'
import { isGroupData } from './util'

const SearchSelectList: FC<SearchSelectListProps> = ({
  data,
  loading,
  onSelect,
  renderItem,
  isGroupList,
}) => {
  return (
    <div className='gm-search-select-popup'>
      {loading ? (
        <Flex alignCenter justifyCenter className='gm-bg gm-padding-5'>
          <Loading size='20px' />
        </Flex>
      ) : (
        !!data.length && (
          <ListBase
            selected={[]}
            data={data}
            onSelect={onSelect}
            isGroupList={isGroupList}
            className='gm-border-0'
            renderItem={renderItem}
          />
        )
      )}
    </div>
  )
}

const SearchSelect: FC<SearchSelectProps> = ({
  data,
  onSearch,
  renderItem,
  withFilter,
  placeholder,
  keyField,
}) => {
  const [inputValue, setInputValue] = useState('')

  const { filterData, loading } = useFilterData({
    data,
    query: inputValue,
    onSearch,
    withFilter,
    keyField,
  })

  const _baseRef = useRef(null)

  const _popoverRef = useRef<Popover>(null)

  const _handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const _handleSelect = () => {
    _popoverRef.current && _popoverRef.current.apiDoSetActive(false)
  }

  return (
    <div ref={_baseRef}>
      <Popover
        ref={_popoverRef}
        popup={
          <SearchSelectList
            data={filterData}
            loading={loading}
            onSelect={_handleSelect}
            renderItem={renderItem}
            isGroupList={isGroupData(data)}
          />
        }
      >
        <Input value={inputValue} onChange={_handleChange} placeholder={placeholder} />
      </Popover>
    </div>
  )
}

export default SearchSelect
