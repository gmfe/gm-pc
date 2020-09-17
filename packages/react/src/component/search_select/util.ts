import _ from 'lodash'
import { pinYinFilter } from '@gm-common/tool'

import { ListBaseDataItem, ListBaseGroupDataItem } from '../list/types'
import { SearchTableSelectColumn } from './types'

interface GetColumnKey {
  (column: SearchTableSelectColumn): string | null
}

const getColumnKey: GetColumnKey = (column) => {
  if (_.isString(column.accessor)) {
    return column.accessor
  } else if (_.isFunction(column.accessor) && column.id) {
    return column.id
  } else if (column.id) {
    return column.id
  }
  return null
}

const isGroupData = (data: ListBaseDataItem[] | ListBaseGroupDataItem[]) => {
  if (data.length) {
    return Object.keys(data[0]).includes('children')
  }
  return false
}

function renderListFilterDefault(
  data: ListBaseGroupDataItem[],
  query: string,
  keyField?: string
): ListBaseGroupDataItem[] {
  const result: ListBaseGroupDataItem[] = []
  data.forEach((item) => {
    const list = item.children.filter((child) =>
      child[keyField || 'text'].includes(query)
    )
    if (list.length) {
      result.push({ ...item, children: list })
    }
  })
  return result
}

function renderListFilterPinYin(
  data: ListBaseGroupDataItem[],
  query: string,
  keyField?: string
): ListBaseGroupDataItem[] {
  const result: ListBaseGroupDataItem[] = []
  data.forEach((item) => {
    const list = pinYinFilter(
      item.children,
      query,
      (v) => (v as ListBaseDataItem)[keyField || 'text']
    )
    if (list.length) {
      result.push({
        ...item,
        children: list as ListBaseDataItem[],
      })
    }
  })
  return result
}

export { getColumnKey, isGroupData, renderListFilterDefault, renderListFilterPinYin }
