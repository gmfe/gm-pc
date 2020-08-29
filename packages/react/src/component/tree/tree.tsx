import { getLocale } from '@gm-pc/locales'
import React, { FC, useEffect, useRef, useState, useMemo, ChangeEvent } from 'react'
import { Input } from '../input'
import { Button } from '../button'
import { Flex } from '../flex'
import {
  getLeafValues,
  getUnLeafValues,
  filterWithQuery,
  getItemOffsetHeight,
  getFindGroupSelected,
} from './util'
import { filterGroupListLeaf } from '../../common/util'
import _ from 'lodash'
import classNames from 'classnames'
import Bottom from './bottom'
import List from './list'
import {
  Value,
  TreeProps,
  FindItem,
  TreeListItem,
  TreeWithFilterFun,
  TreeStatic,
  TreeWithFilter,
} from './types'
import { FixedSizeList } from 'react-window'

function getFilterList(list: TreeListItem[], query: string, withFilter: TreeWithFilter) {
  if (query === '') {
    return list
  }

  return filterWithQuery(list, query, withFilter)
}

function getGroupSelected(filterList: TreeListItem[], query: string) {
  if (query === '') {
    return []
  }

  return getUnLeafValues(filterList)
}

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
  onActiveValues = () => [],
  withFindFilter = false,
  findPlaceholder = getLocale('输入定位信息'),
  ...rest
}) => {
  const refList = useRef<HTMLDivElement>(null)
  const refFixedList = useRef<FixedSizeList>(null)
  const refInput = useRef<HTMLInputElement>(null)
  const [listHeight, setListHeight] = useState<number | null>(null)

  // 搜索
  const [query, setQuery] = useState<string>('')
  const [delayQuery, setDelayQuery] = useState<string>('')
  // 定位
  const [findQuery, setFindQuery] = useState<string>('')
  const [findItems, setFindItems] = useState<FindItem[]>([])
  const [findIndex, setFindIndex] = useState<number>(-1)
  // 区分正常的 展开收起 和 搜索导致的展开收起
  const [groupSelected, setGroupSelected] = useState<Value[]>([])
  // 保存一个函数的引用而已
  const refDebounce = useRef(
    _.debounce((value: string) => {
      setDelayQuery(value)
    }, 300)
  )

  const filterList = useMemo(() => {
    return getFilterList(list, delayQuery, withFilter)
  }, [list, delayQuery, withFilter])

  const queryGroupSelected = useMemo(() => {
    return getGroupSelected(filterList, delayQuery)
  }, [filterList, delayQuery])

  useEffect(() => {
    if (refList.current) {
      setListHeight(refList.current.offsetHeight)
    }
  }, [])

  useEffect(() => {
    const scrollTop = findItems[findIndex] ? findItems[findIndex].height : 0
    findItems[findIndex] && doScroll(scrollTop)
  }, [findIndex])

  const handleSelectAll = (checked: boolean) => {
    onSelectValues(checked ? getLeafValues(list) : [])
  }

  const handleQuery = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setQuery(query)

    // 延迟更新 delayQuery
    refDebounce.current(query)
  }

  const handleFindQuery = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    setFindQuery(v)
    setFindItems([])
    setFindIndex(-1)
  }

  const doScroll = (scrollTop: number) => {
    if (refFixedList.current) {
      refFixedList.current.scrollTo(scrollTop)
    }
  }

  const doSearch = (): FindItem[] => {
    const find_list = (withFindFilter as TreeWithFilterFun)(list, findQuery)
    // @ts-ignore
    const box_height = refList.current.offsetHeight
    const group_selected = getFindGroupSelected(list, find_list)
    const scrollList = _.map(find_list, (item) => ({
      height: getItemOffsetHeight(item, 28, box_height, list, group_selected),
      value: item.value,
    }))

    // 展开定位到数据
    setGroupSelected(group_selected)

    if (!find_list || !scrollList.length) {
      doScroll(0)
      return []
    }
    setFindItems(scrollList)

    return scrollList
  }

  const handleNext = () => {
    const list = doSearch()
    if (findIndex + 1 === list.length) {
      setFindIndex(0)
    } else {
      setFindIndex(findIndex + 1)
    }
  }

  const handleGroupSelect = (groupSelected: Value[]) => {
    setGroupSelected(groupSelected)
  }

  const newGS = query ? queryGroupSelected : groupSelected

  return (
    <Flex {...rest} column className={classNames('gm-tree-v2', className)}>
      {title && (
        <div className='gm-padding-5 gm-back-bg text-center gm-border-bottom'>
          {title}
        </div>
      )}
      {withFilter && (
        <div className='gm-tree-v2-filter'>
          <Input
            type='text'
            value={query}
            onChange={handleQuery}
            placeholder={placeholder}
          />
        </div>
      )}
      {withFindFilter && (
        <Flex>
          <Input
            ref={refInput}
            placeholder={findPlaceholder}
            onChange={handleFindQuery}
            value={findQuery}
          />
          <Button onClick={handleNext}>
            {getLocale('定位')}
          </Button>
        </Flex>
      )}
      <div className='gm-flex-flex' ref={refList}>
        {!!listHeight && (
          <List
            listRef={refFixedList}
            list={filterList}
            listHeight={listHeight}
            groupSelected={newGS}
            onGroupSelect={handleGroupSelect}
            selectedValues={selectedValues}
            onSelectValues={onSelectValues}
            renderLeafItem={renderLeafItem}
            renderGroupItem={renderGroupItem}
            onActiveValues={onActiveValues}
            indeterminateList={indeterminateList}
            activeValue={findItems[findIndex] ? findItems[findIndex].value : activeValue}
          />
        )}
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
