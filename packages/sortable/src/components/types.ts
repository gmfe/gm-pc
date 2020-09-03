import Sortable, { Options, SortableEvent } from 'sortablejs'
import { ElementType, HTMLAttributes, ReactElement, ReactNode } from 'react'

type Value = any

interface SortableBaseProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  options: Options
  onChange?(remoteItems: string[], sortable: Sortable, event: SortableEvent): void
  tag: ElementType
  disabled?: boolean
}

interface SortableDataItem {
  value: Value
  text: string
  [key: string]: any
}

interface SortableCommonProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /**
   * options.group 有值的时候要传。
   * 此时 data 是 group 集合数据，groupValues 是当前组件的数据
   */
  groupValues?: Value[]
  renderItem?(value: SortableDataItem, index: number): ReactNode
  itemProps?: HTMLAttributes<HTMLDivElement>
  tag?: ElementType
  options?: Options
  disabled?: boolean
}

interface SortableProps extends SortableCommonProps {
  data: SortableDataItem[]
  onChange(data: SortableDataItem[]): void
}

interface GroupSortableProps extends SortableCommonProps {
  /* 二维数组 */
  data: SortableDataItem[][]
  onChange(data: SortableDataItem[][]): void
  children: (items: ReactElement<SortableProps>[]) => ReactElement
}

export type { SortableBaseProps, SortableDataItem, SortableProps, GroupSortableProps }
