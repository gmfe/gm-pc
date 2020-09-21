import { getLocale } from '@gm-pc/locales'
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react'
import classNames from 'classnames'
import { Flex } from '../flex'
import filterGroupListLeaf from '../../common/utils/filter_group_list_leaf'
import { AutoFull } from '../auto_full'
import {
  getLeafValues,
  getFilterList,
  getQueryGroupSelected,
  listToFlat,
  getFindGroupSelected,
  getCheckboxStatusMap,
} from './util'
import Bottom from './bottom'
import List from './list'
import { Value, TreeProps, TreeRefApi, ListApi } from './types'
import Search from './search'
import Find from './find'

const Tree = forwardRef<TreeRefApi, TreeProps>(
  (
    {
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
      indeterminateValues = [],
      activeValue = null,
      onActiveValue,
      showFind,
      findPlaceholder = getLocale('定位信息'),
      ...rest
    },
    ref
  ) => {
    const refList = useRef<ListApi>(null)

    // 搜索
    const [query, setQuery] = useState<string>('')
    // query 后的树状数据
    const filterList = useMemo(() => {
      return getFilterList(list, query, withFilter)
    }, [list, query, withFilter])
    // 经 query 后扁平的数据
    const filterFlatList = useMemo(() => {
      return listToFlat(
        filterList,
        () => true,
        () => true
      )
    }, [filterList])

    // 手动的 groupSelected
    const [groupSelected, setGroupSelected] = useState<Value[]>([])

    // 搜索的 groupSelected
    const queryGroupSelected = useMemo(() => {
      return getQueryGroupSelected(filterFlatList, query)
    }, [filterFlatList, query])

    // 定位相关
    const [findValue, setFindValue] = useState<any>(null)
    // 定位的 groupSelected
    const findGroupSelected = useMemo(() => {
      return getFindGroupSelected(filterFlatList, findValue)
    }, [filterFlatList, findValue])

    useImperativeHandle(
      ref,
      () => {
        return {
          apiDoScrollToValue(findValue) {
            if (!findValue) {
              return
            }

            if (refList.current) {
              refList.current.apiDoScrollToValue(findValue)
            }
          },
        }
      },
      []
    )

    // 处理findValue滚动
    useEffect(() => {
      if (!findValue) {
        return
      }

      if (refList.current) {
        refList.current.apiDoScrollToValue(findValue)
      }
    }, [findValue])

    // 提供给 list
    const checkboxStatusMap = useMemo(
      () =>
        getCheckboxStatusMap(
          filterFlatList,
          groupSelected,
          selectedValues,
          indeterminateValues
        ),
      [filterFlatList, groupSelected, selectedValues, indeterminateValues]
    )

    const handleSelectAll = useCallback(
      (checked: boolean) => {
        onSelectValues(checked ? getLeafValues(list) : [])
      },
      [onSelectValues]
    )

    const handleQuery = useCallback(
      (value: string) => {
        setQuery(value)
      },
      [setQuery]
    )

    const handleFind = useCallback(
      (value: any) => {
        setFindValue(value)
      },
      [setFindValue]
    )

    const handleGroupSelect = useCallback(
      (groupSelected: Value[]) => {
        setGroupSelected(groupSelected)
      },
      [setGroupSelected]
    )

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
            flatList={filterFlatList}
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
                flatList={filterFlatList}
                groupSelected={newGS}
                onGroupSelect={handleGroupSelect}
                selectedValues={selectedValues}
                onSelectValues={onSelectValues}
                renderLeafItem={renderLeafItem}
                renderGroupItem={renderGroupItem}
                onActiveValue={onActiveValue}
                activeValue={activeValue}
                findValue={findValue}
                checkboxStatusMap={checkboxStatusMap}
              />
            )}
          </AutoFull>
        </div>

        {showAllCheck && (
          <Bottom
            list={list}
            selectedValues={selectedValues}
            onChange={handleSelectAll}
          />
        )}
      </Flex>
    )
  }
)

// 哎呀，暴露了两个方法出去，请小心
// @ts-ignore
Tree.filterGroupList = filterGroupListLeaf
// @ts-ignore
Tree.selectedValues2SelectedList = (list, selectValues) => {
  const selectedList = filterGroupListLeaf(list, (v) => selectValues.includes(v.value))

  return selectedList
}

export default Tree
