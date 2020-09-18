import { getLocale } from '@gm-pc/locales'
import React, { FC, useEffect, useRef, useState, useMemo, useCallback } from 'react'
import classNames from 'classnames'
import { Flex } from '../flex'
import { filterGroupListLeaf } from '../../common/util'
import { AutoFull } from '../auto_full'
import { getLeafValues, getFilterList, getGroupSelected } from './util'
import Bottom from './bottom'
import List from './list'
import { Value, TreeProps, TreeStatic, ListApi } from './types'
import Search from './search'
import Find from './find'

const Tree: FC<TreeProps> & TreeStatic = ({
  title,
  list,
  selectedValues,
  onSelectValues,
  placeholder = getLocale('搜索'),
  withFilter = true,
  renderLeafItem,
  renderGroupItem,
  className,
  showAllCheck = true,
  indeterminateList = [],
  activeValue = null,
  onActiveValue,
  showFind,
  findPlaceholder = getLocale('定位信息'),
  ...rest
}) => {
  const refList = useRef<ListApi>(null)

  // 搜索
  const [query, setQuery] = useState<string>('')
  // 定位
  const [findValue, setFindValue] = useState<any>(null)
  // 区分正常的 展开收起 和 搜索导致的展开收起 和 定位展开收起
  const [groupSelected, setGroupSelected] = useState<Value[]>([])
  // 定位的 groupSelected
  const [findGroupSelected, setFindGroupSelected] = useState<Value[]>([])

  // 处理findValue滚动
  useEffect(() => {
    if (findValue === null) {
      return
    }

    if (refList.current) {
      refList.current.apiDoScrollToValue(findValue)
    }
  }, [findValue])

  const filterList = useMemo(() => {
    return getFilterList(list, query, withFilter)
  }, [list, query, withFilter])

  const queryGroupSelected = useMemo(() => {
    return getGroupSelected(filterList, query)
  }, [filterList, query])

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      onSelectValues(checked ? getLeafValues(list) : [])
    },
    [onSelectValues]
  )

  const handleQuery = useCallback((value: string) => {
    setQuery(value)
  }, [])

  const handleFind = useCallback((value: any) => {
    setFindValue(value)
  }, [])

  const handleGroupSelect = useCallback((groupSelected: Value[]) => {
    setGroupSelected(groupSelected)
  }, [])

  const handleFindGroupSelect = useCallback((findGroupSelected: Value[]) => {
    setFindGroupSelected(findGroupSelected)
  }, [])

  // 优先 find
  let newGS = groupSelected
  if (findValue) {
    newGS = findGroupSelected
  } else if (query) {
    newGS = queryGroupSelected
  }

  return (
    <Flex {...rest} column className={classNames('gm-tree', className)}>
      {title && (
        <div className='gm-padding-5 gm-back-bg gm-text-center gm-border-bottom'>
          {title}
        </div>
      )}
      {withFilter && <Search placeholder={placeholder} onChange={handleQuery} />}
      {showFind && (
        <Find
          placeholder={findPlaceholder}
          filterList={filterList}
          onGroupSelected={handleFindGroupSelect}
          onFind={handleFind}
        />
      )}
      <div className='gm-flex-flex'>
        <AutoFull>
          {(size) => (
            <List
              ref={refList}
              listHeight={size.height}
              listWidth={size.width}
              list={filterList}
              groupSelected={newGS}
              onGroupSelect={handleGroupSelect}
              selectedValues={selectedValues}
              onSelectValues={onSelectValues}
              renderLeafItem={renderLeafItem}
              renderGroupItem={renderGroupItem}
              indeterminateList={indeterminateList}
              onActiveValue={onActiveValue}
              activeValue={activeValue}
              findValue={findValue}
            />
          )}
        </AutoFull>
      </div>

      {showAllCheck ? (
        <Bottom list={list} selectedValues={selectedValues} onChange={handleSelectAll} />
      ) : null}
    </Flex>
  )
}

// 哎呀，暴露了两个方法出去，请小心
Tree.filterGroupList = filterGroupListLeaf
Tree.selectedValues2SelectedList = (list, selectValues) => {
  const selectedList = filterGroupListLeaf(list, (v) => selectValues.includes(v.value))

  return selectedList
}

export default Tree
