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

type TreeWithFindFilter = TreeWithFilter

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
  onActiveValues?(activeValues: Value[]): void

  title?: string
  withFilter?: TreeWithFilter
  renderLeafItem?(item: TreeListItem): ReactNode
  renderGroupItem?(item: TreeListItem): ReactNode
  placeholder?: string
  /** 是否显示全选 */
  showAllCheck?: boolean
  /** 半选 value 列表 */
  indeterminateList?: Value[]
  withFindFilter?: TreeWithFindFilter
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

export type {
  Value,
  FindItem,
  TreeListItem,
  TreeWithFindFilter,
  TreeWithFilter,
  TreeWithFilterFun,
  TreeProps,
  TreeStatic,
  BottomProps,
}
