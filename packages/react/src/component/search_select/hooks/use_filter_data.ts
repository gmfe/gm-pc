import { useState, useEffect, useRef } from 'react'
import { renderListFilterPinYin, renderListFilterDefault } from '../util'
import { useAsync } from '@gm-common/hooks'
import _ from 'lodash'
import { useDebounceValue } from './use_debounce_value'
import { filterParams } from '../types'
import { ListBaseDataItem } from '../../list'
import { ListBaseGroupDataItem } from '../../list/types'

const UNUSEFUL_FUNCTION = () => Promise.resolve()

const getGroupData = (
  data: ListBaseDataItem[] | ListBaseGroupDataItem[]
): ListBaseGroupDataItem[] => {
  let groupData = data as ListBaseGroupDataItem[]
  const isGroupData = (data: ListBaseDataItem[] | ListBaseGroupDataItem[]) => {
    return Object.keys(data[0]).includes('children')
  }
  if (data.length && !isGroupData(data)) {
    groupData = [
      {
        label: '',
        children: data as ListBaseDataItem[],
      },
    ]
  }
  return groupData as ListBaseGroupDataItem[]
}

const useFilterData = ({
  data,
  query,
  withFilter,
  filterType,
  onSearch = UNUSEFUL_FUNCTION,
  keyField,
}: filterParams) => {
  const preQuery = useRef('')
  const debounceQuery = useDebounceValue(query, 500)
  const [filterData, setFilterData] = useState(getGroupData(data))
  const { run, loading } = useAsync(onSearch, {
    manual: true,
  })

  useEffect(() => {
    setFilterData(getGroupData(data))
  }, [data])

  useEffect(() => {
    // onSearch为UNUSEFUL_FUNCTION，说明未传入onSearch，本地搜索
    if (onSearch === UNUSEFUL_FUNCTION) {
      if (data.length && debounceQuery !== preQuery.current) {
        preQuery.current = debounceQuery
        const groupData = getGroupData(data)
        if (withFilter) {
          setFilterData(withFilter(groupData, debounceQuery))
        } else if (filterType === 'pinyin') {
          setFilterData(renderListFilterPinYin(groupData, debounceQuery, keyField))
        } else {
          setFilterData(renderListFilterDefault(groupData, debounceQuery, keyField))
        }
      }
    } else {
      //  远程搜索
      if (
        (debounceQuery !== '' || preQuery.current !== '') &&
        debounceQuery !== preQuery.current
      ) {
        preQuery.current = debounceQuery
        run({ query: debounceQuery })
      }
    }
  }, [debounceQuery, filterType, withFilter, run, data, onSearch, keyField])

  return { filterData, loading }
}

export { useFilterData }
