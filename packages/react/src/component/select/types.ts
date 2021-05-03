import { CSSProperties, KeyboardEvent, ReactNode } from 'react'
import { ListDataItem } from '../../types'

interface SelectProps<V> {
  data?: ListDataItem<V>[]
  value?: V
  /** 默认 {value: 0, text: '全部'} */
  all?: boolean | { value?: V; text?: string }
  onChange?(selected: V): void
  disabled?: boolean
  renderItem?(item: ListDataItem<V>, index: number): ReactNode
  renderSelected?(selected: ListDataItem<V>): ReactNode
  clean?: boolean
  popoverType?: 'focus' | 'realFocus'
  isInPopup?: boolean
  onKeyDown?(event: KeyboardEvent): void
  className?: string
  style?: CSSProperties
}

export type { SelectProps }
