import _ from 'lodash'
import { pinYinFilter } from '@gm-common/tool'
import filterGroupList from '../../common/utils/filter_group_list'
import {
  TreeListItem,
  TreeWithFilter,
  Value,
  FlatListItem,
  CheckboxStatusMap,
} from './types'

// 这里做一层 cache
const _cache: {
  [key: string]: boolean
} = {}

const filterWithQuery = (
  list: TreeListItem[],
  query: string,
  withFilter: TreeWithFilter
): TreeListItem[] => {
  let processList
  if (withFilter === true) {
    processList = filterGroupList(list, (v) => {
      const field = `${query}______${v.text}`
      if (_cache[field] === undefined) {
        _cache[field] = pinYinFilter([v], query, (v) => v.text).length > 0
      }

      return _cache[field]
    })
  } else if (withFilter) {
    processList = withFilter(list, query)
  } else {
    processList = list
  }

  return processList
}

// 把 list 打平，格式见 FlatListItem
function listToFlat(
  list: TreeListItem[] | undefined,
  /** 是否作为数据返回 */
  pushCondition: (item: TreeListItem) => boolean,
  /** 是否遍历 children 下去 */
  childrenCondition: (item: TreeListItem) => boolean,
  result: FlatListItem[] = [],
  level: number = 0,
  /** 父亲的 values */
  pValues: Value[] = []
): FlatListItem[] {
  _.each(list, (item) => {
    if (pushCondition(item)) {
      result.push({
        data: item,
        value: item.value,
        pValues,
        isLeaf: !item.children,
        level,
        unLeafValues: getUnLeafValues(item.children || []),
        leafValues: getLeafValues(item.children || []),
      })
    }

    if (childrenCondition(item)) {
      listToFlat(
        item.children,
        pushCondition,
        childrenCondition,
        result,
        level + 1,
        pValues.concat([item.value])
      )
    }
  })

  return result
}

function flatListFilterWithGroupSelected(
  flatList: FlatListItem[],
  groupSelected: Value[]
) {
  return _.filter(flatList, (item) => {
    // 一级肯定是出来的
    if (item.level === 0) {
      return true
    } else {
      return groupSelected.includes(item.pValues[item.level - 1])
    }
  })
}

function getUnLeafValues(list: TreeListItem[]) {
  const flat = listToFlat(
    list,
    (item) => !!item.children,
    () => true
  )

  return _.map(flat, (item) => item.data.value)
}

function getLeafValues(list: TreeListItem[]) {
  const flat = listToFlat(
    list,
    (item) => !item.children,
    () => true
  )

  return _.map(flat, (item) => item.data.value)
}

// 用find，高效。深度遍历，找到存在没选的就终止遍历。
function unSelectAll(list: TreeListItem[], selectedValues: Value[]): boolean {
  const unSelected = _.find(list, (item) => {
    if (item.children) {
      return unSelectAll(item.children, selectedValues)
    } else {
      return !selectedValues.includes(item.value)
    }
  })

  return !!unSelected
}

function getFilterList(
  list: TreeListItem[],
  query: string,
  withFilter: TreeWithFilter
): TreeListItem[] {
  if (query === '') {
    return list
  }

  return filterWithQuery(list, query, withFilter)
}

// 就是全展开
function getQueryGroupSelected(flatList: FlatListItem[], query: string) {
  if (query === '') {
    return []
  }

  const filterFlatList = _.filter(flatList, (item) => !item.isLeaf)

  return _.map(filterFlatList, (v) => v.value)
}

// 只打开匹配的一个
function getFindGroupSelected(flatList: FlatListItem[], value: any) {
  if (value === null) {
    return []
  }

  const item = _.find(flatList, (item) => item.value === value)

  return item ? item.pValues : []
}

function getCheckboxStatusMap(
  filterFlatList: FlatListItem[],
  groupSelected: Value[],
  selectedValues: Value[],
  indeterminateValues: Value[]
): CheckboxStatusMap {
  const map: CheckboxStatusMap = {}

  _.each(filterFlatList, (item) => {
    if (item.isLeaf) {
      map[item.value] = {
        expand: false,
        checked: selectedValues.includes(item.value),
        indeterminate: _.includes(indeterminateValues, item.value),
      }
    } else {
      const selectedLeafValues = _.intersection(selectedValues, item.leafValues)
      const indeterminateLeafValues = _.intersection(indeterminateValues, item.leafValues)

      const isChecked =
        item.leafValues.length !== 0 &&
        item.leafValues.length === selectedLeafValues.length

      map[item.value] = {
        expand: groupSelected.includes(item.value),
        checked: isChecked,
        indeterminate:
          !isChecked &&
          (selectedLeafValues.length !== 0 || indeterminateLeafValues.length !== 0),
      }
    }
  })

  return map
}

export {
  getUnLeafValues,
  getLeafValues,
  filterWithQuery,
  flatListFilterWithGroupSelected,
  unSelectAll,
  listToFlat,
  getFilterList,
  getQueryGroupSelected,
  getFindGroupSelected,
  getCheckboxStatusMap,
}
