import { UseAsyncService } from '@gm-common/hooks'
import { ReactNode } from 'react'
import { ListBaseDataItem } from '../list'
import { ListBaseGroupDataItem } from '../list/types'

export type SearchTableSelectColumn = {
  Header: string
  accessor: string
  width: number
  id?: string
  Cell?: (cellProps: any) => ReactNode
}

export interface filterParams {
  data: ListBaseGroupDataItem[] | ListBaseDataItem[]
  query: string
  withFilter?: (
    groupData: ListBaseGroupDataItem[],
    query: string
  ) => ListBaseGroupDataItem[]
  filterType?: 'pinyin'
  onSearch?: UseAsyncService
  keyField?: string
}

export interface SearchSelectProps {
  data: ListBaseGroupDataItem[] | ListBaseDataItem[]
  onSearch?: UseAsyncService
  withFilter?: (
    groupData: ListBaseGroupDataItem[],
    query: string
  ) => ListBaseGroupDataItem[]
  renderItem?: (Item: ListBaseDataItem, index: number) => ReactNode
  placeholder?: string
  isGroupList?: boolean
  keyField?: string
}

export type SearchTableSelectProps = SearchTableSelectLocal | SearchTableSelectServer

export interface SearchTableSelectLocal extends SearchSelectProps {
  columns: SearchTableSelectColumn[]
  keyField: string
}

export interface SearchTableSelectServer extends SearchSelectProps {
  columns: SearchTableSelectColumn[]
  onSearch: UseAsyncService
}

export interface SearchSelectListProps {
  data: ListBaseGroupDataItem[]
  loading: boolean
  onSelect: () => void
  renderItem?: (Item: ListBaseDataItem, index: number) => ReactNode
  isGroupList: boolean
}
