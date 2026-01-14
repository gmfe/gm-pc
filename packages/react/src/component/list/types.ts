import { CSSProperties, HTMLAttributes, ReactNode } from 'react'

import { ListDataItem, ListGroupDataItem } from '../../types'

interface CommonListProps<V> {
  multiple?: boolean
  isGroupList?: boolean
  renderItem?(item: ListDataItem<V>, index: number): ReactNode | string
  willActiveIndex?: number
  isScrollTo?: boolean
  /* 少用，给与更多 Item 的响应 */
  getItemProps?(item: ListDataItem<V>): HTMLAttributes<HTMLDivElement>
  className?: string
  style?: CSSProperties
  /** 是否显示选中状态的图标，默认为 true */
  showSelectedIcon?: boolean
}

interface ListBaseProps<V> extends CommonListProps<V> {
  data: ListGroupDataItem<V>[]
  selected: V[]
  onSelect?(selected: V[], item: ListDataItem<V>): void
}

interface ListProps<V> extends CommonListProps<V> {
  /** 区分 group */
  data: ListDataItem<V>[] | ListGroupDataItem<V>[]
  /**
   * 多选传 value 数组
   */
  selected?: V | V[]

  /**
   * 多选返回 value 数组
   */
  onSelect?(selected: V | V[]): void
}

export type { ListBaseProps, ListProps }
