import { CSSProperties, HTMLAttributes, ReactNode } from 'react'

type Value = any

interface ListBaseDataItem {
  value: Value
  text: string
  disabled?: boolean
  [key: string]: any
}

interface ListBaseGroupDataItem {
  label: string
  children: ListBaseDataItem[]
}

interface CommonListProps {
  multiple?: boolean
  isGroupList?: boolean
  renderItem?(value: ListBaseDataItem, index: number): ReactNode
  willActiveIndex?: number
  isScrollTo?: boolean
  /* 少用，给与更多 Item 的响应 */
  getItemProps?(value: ListBaseDataItem): HTMLAttributes<HTMLDivElement>
  className?: string
  style?: CSSProperties
}

interface ListBaseProps extends CommonListProps {
  data: ListBaseGroupDataItem[]
  selected: Value[]
  onSelect?(selected: Value[]): void
}

type ListData = (ListBaseDataItem | ListBaseGroupDataItem)[]

interface ListProps extends CommonListProps {
  /**
   * 区分 group
   */
  data: ListData
  /**
   * 多选传 value 数组
   */
  selected?: Value | Value[]

  /**
   * 多选返回 value 数组
   */
  onSelect?(selected: Value | Value[]): void
}

export type {
  Value,
  ListBaseDataItem,
  ListData,
  ListBaseGroupDataItem,
  ListBaseProps,
  ListProps,
}
