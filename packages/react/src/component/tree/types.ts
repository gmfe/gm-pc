import { CSSProperties, ReactNode } from 'react'

type Value = any

interface TreeListItem {
  value: Value
  text: string
  disabled?: boolean
  children?: TreeListItem[]
  [key: string]: any
}

type TreeWithFilterFun = (list: TreeListItem[], query: string) => TreeListItem[]

type TreeWithFilter = boolean | TreeWithFilterFun

interface TreeProps {
  /** 树状列表 */
  list: TreeListItem[]
  /** 已勾选的数据 */
  selectedValues?: Value[]
  /** 勾选回调 */
  onSelectValues?(selectedValues: Value[]): void
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
  /** 没有勾选框 */
  disabledCheckbox?: boolean
  /** 半选 value 列表 */
  indeterminateValues?: Value[]
  showFind?: boolean
  findPlaceholder?: string
  className?: string
  style?: CSSProperties
  border?: boolean // 是否需要边框
}

interface TreeRefApi {
  apiDoScrollToValue(value: any): void
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
  flatList: FlatListItem[]
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
  findValue?: any
  checkboxStatusMap: CheckboxStatusMap
  disabledCheckbox?: boolean
}

interface ListApi {
  apiDoScrollToValue(value: any): void
}

interface ItemProps {
  expand: boolean
  onExpand(): void
  checked: boolean
  indeterminate: boolean
  onCheck(): void
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
  disabledCheckbox?: boolean
}

interface SearchProps {
  placeholder?: string
  onChange(value: string): void
}

interface FindProps {
  placeholder?: string
  flatList: FlatListItem[]
  onFind(value: any): void
}

interface FlatListItem {
  data: TreeListItem
  value: Value
  /** 父亲节点的 values */
  pValues: Value[]
  /** 是否叶子节点 */
  isLeaf: boolean
  /** 层级 */
  level: number
  unLeafValues: Value[]
  /** 当前节点的所有叶子节点 */
  leafValues: Value[]
}

interface CheckboxStatusMap {
  [value: string]: {
    expand: boolean
    checked: boolean
    indeterminate: boolean
  }
}

export type {
  Value,
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
  FlatListItem,
  CheckboxStatusMap,
  TreeRefApi,
}
