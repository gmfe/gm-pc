import React, { ChangeEvent, FC, useMemo, useRef, useState } from 'react'
import { Input } from '../input'
import { Button } from '../button'
import { getLocale } from '@gm-pc/locales'
import { Flex } from '../flex'
import { FindProps } from './types'
import _ from 'lodash'
import { getFilterList, getGroupSelected, listToFlat } from './util'
import { pinYinFilter } from '@gm-common/tool/src/index'

const Find: FC<FindProps> = ({ placeholder, filterList, onGroupSelected, onFind }) => {
  const [query, setQuery] = useState('')
  // 用 ref，因为不影响 UI
  const refIndex = useRef(-1)

  const debounceFind = useMemo(() => {
    return _.debounce((value: any) => {
      onFind(value)
    }, 500)
  }, [onFind])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    // 重置索引
    refIndex.current = -1
    // 复原
    debounceFind(null)
  }

  // 1 处理 groupSelected
  // 2 回调 滚动的值
  const handleFind = () => {
    if (query === '') {
      return
    }

    // 匹配的数据树
    // filterList => matchList，获取到匹配的数据
    const matchList = getFilterList(filterList, query, true)

    // 没有数据返回
    if (matchList.length === 0) {
      return
    }

    // 处理 groupSelected
    const gs = getGroupSelected(matchList, query)
    onGroupSelected(gs)

    // 匹配的 flat 数据
    const flatMatchList = listToFlat(
      matchList,
      (item) => pinYinFilter([item], query, (v) => v.text).length > 0,
      () => true
    )

    // 匹配的原始数据
    const items = _.map(flatMatchList, (v) => v.data)

    // 处理下索引
    if (refIndex.current === -1) {
      refIndex.current = 0
    } else {
      refIndex.current++
    }
    if (refIndex.current > items.length) {
      refIndex.current = 0
    }

    const value = items[refIndex.current].value

    onFind(value)
  }

  return (
    <Flex>
      <Input placeholder={placeholder} onChange={handleChange} value={query} />
      <Button onClick={handleFind}>{getLocale('定位')}</Button>
    </Flex>
  )
}

export default React.memo(Find)
