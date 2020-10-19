import { CSSProperties, ReactNode } from 'react'

interface TreeListItem<V> {
  value: V
  text: string
  disabled?: boolean
  children?: TreeListItem<V>[]
  [key: string]: any
}

type TreeWithFilterFun<V> = (list: TreeListItem<V>[], query: string) => TreeListItem<V>[]

type TreeWithFilter<V> = boolean | TreeWithFilterFun<V>

interface TreeProps<V> {
  /** 树状列表 */
  list: TreeListItem<V>[]
  /** 已勾选的数据 */
  selectedValues?: V[]
  /** 勾选回调 */
  onSelectValues?(selectedValues: V[]): void
  /** 点击选中的数据 */
  activeValue?: V
  /** 点击选中回调 */
  onActiveValue?(activeValue: V, item: TreeListItem<V>): void

  title?: string
  withFilter?: TreeWithFilter<V>
  renderLeafItem?(item: TreeListItem<V>): ReactNode
  renderGroupItem?(item: TreeListItem<V>): ReactNode
  placeholder?: string
  /** 是否显示全选 */
  showAllCheck?: boolean
  /** 没有勾选框 */
  disabledCheckbox?: boolean
  /** 半选 value 列表 */
  indeterminateValues?: V[]
  showFind?: boolean
  findPlaceholder?: string
  className?: string
  style?: CSSProperties
}

interface TreeRefApi<V> {
  apiDoScrollToValue(value: V): void
}

interface TreeStatic<V> {
  filterGroupList(
    list: TreeListItem<V>[],
    predicate: (item: TreeListItem<V>) => boolean
  ): TreeListItem<V>[]
  selectedValues2SelectedList(
    list: TreeListItem<V>[],
    selectValues: V[]
  ): TreeListItem<V>[]
}

interface BottomProps<V> {
  list: TreeListItem<V>[]
  selectedValues: V[]
  onChange(checkedAll: boolean): void
}

interface ListProps<V> {
  flatList: FlatListItem<V>[]
  groupSelected: V[]
  onGroupSelect(selected: V[]): void
  selectedValues: V[]
  onSelectValues(values: V[]): void
  listHeight: number
  listWidth: number
  renderLeafItem?(item: TreeListItem<V>): ReactNode
  renderGroupItem?(item: TreeListItem<V>): ReactNode
  activeValue?: V
  onActiveValue?(activeValue: V, item: TreeListItem<V>): void
  findValue?: V
  checkboxStatusMap: CheckboxStatusMap
  disabledCheckbox?: boolean
}

interface ListApi<V> {
  apiDoScrollToValue(value: V): void
}

interface ItemProps<V> {
  expand: boolean
  onExpand(): void
  checked: boolean
  indeterminate: boolean
  onCheck(): void
  flatItem: {
    isLeaf: boolean
    level: number
    data: TreeListItem<V>
  }
  style: CSSProperties
  renderLeafItem?(item: TreeListItem<V>): ReactNode
  renderGroupItem?(item: TreeListItem<V>): ReactNode
  onActive(data: TreeListItem<V>): void
  active?: boolean
  findActive?: boolean
  disabledCheckbox?: boolean
}

interface SearchProps {
  placeholder?: string
  onChange(value: string): void
}

interface FindProps<V> {
  placeholder?: string
  flatList: FlatListItem<V>[]
  onFind(value: V): void
}

interface FlatListItem<V> {
  data: TreeListItem<V>
  value: V
  /** 父亲节点的 values */
  pValues: V[]
  /** 是否叶子节点 */
  isLeaf: boolean
  /** 层级 */
  level: number
  unLeafValues: V[]
  /** 当前节点的所有叶子节点 */
  leafValues: V[]
}

interface CheckboxStatusMap {
  [value: string]: {
    expand: boolean
    checked: boolean
    indeterminate: boolean
  }
}

export type {
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
