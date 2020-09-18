import { CSSProperties, ReactNode } from 'react'

type Value = any

interface TreeListItem {
  value: Value
  text: string
  disabled?: boolean
  children?: TreeListItem[]
  [key: string]: any
}

interface FindItem {
  height: number
  value: Value
}

type TreeWithFilterFun = (list: TreeListItem[], query: string) => TreeListItem[]

type TreeWithFilter = boolean | TreeWithFilterFun

interface TreeProps {
  /** 树状列表 */
  list: TreeListItem[]
  /** 已勾选的数据 */
  selectedValues: Value[]
  /** 勾选回调 */
  onSelectValues(selectedValues: Value[]): void
  /** 点击选中的数据 */
  activeValue?: Value
  /** 点击选中回调 */
  onActiveValue?(activeValue: Value, item: TreeListItem): void

  title?: string
  withFilter?: TreeWithFilter
  renderLeafItem?(item: TreeListItem): ReactNode
  renderGroupItem?(item: TreeListItem): ReactNode
  placeholder?: string
  /** 是否显示全选 */
  showAllCheck?: boolean
  /** 叶子原生的半选 value 列表 */
  leafIndeterminateValues?: Value[]
  showFind?: boolean
  findPlaceholder?: string
  className?: string
  style?: CSSProperties
}

interface TreeStatic {
  filterGroupList(
    list: TreeListItem[],
    predicate: (item: TreeListItem) => boolean
  ): TreeListItem[]
  selectedValues2SelectedList(list: TreeListItem[], selectValues: Value[]): TreeListItem[]
}

interface BottomProps {
  list: TreeListItem[]
  selectedValues: Value[]
  onChange(checkedAll: boolean): void
}

interface ListProps {
  list: TreeListItem[]
  groupSelected: Value[]
  onGroupSelect(selected: Value[]): void
  selectedValues: Value[]
  onSelectValues(values: Value[]): void
  listHeight: number
  listWidth: number
  renderLeafItem?(item: TreeListItem): ReactNode
  renderGroupItem?(item: TreeListItem): ReactNode
  activeValue?: Value
  onActiveValue?(activeValue: Value, item: TreeListItem): void
  leafIndeterminateValues?: Value[]
  findValue?: any
}

interface ListApi {
  apiDoScrollToValue(value: any): void
}

interface ItemProps {
  isGrouped: boolean
  onGroup(data: TreeListItem): void
  isSelected: boolean
  isIndeterminate: boolean
  onSelect(data: TreeListItem, isSelected: boolean): void
  flatItem: {
    isLeaf: boolean
    level: number
    data: TreeListItem
  }
  style: CSSProperties
  renderLeafItem?(item: TreeListItem): ReactNode
  renderGroupItem?(item: TreeListItem): ReactNode
  onActive(data: TreeListItem): void
  active?: boolean
  findActive?: boolean
}

interface SearchProps {
  placeholder?: string
  onChange(value: string): void
}

interface FindProps {
  placeholder?: string
  filterList: TreeListItem[]
  onGroupSelected(selected: Value[]): void
  onFind(value: any): void
}

export type {
  Value,
  FindItem,
  TreeListItem,
  BottomProps,
  SearchProps,
  FindProps,
  ListProps,
  ListApi,
  ItemProps,
  TreeWithFilter,
  TreeWithFilterFun,
  TreeProps,
  TreeStatic,
}
