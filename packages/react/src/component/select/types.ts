import { ListProps } from '../list'
import { CSSProperties, KeyboardEvent } from 'react'
import { ListDataItem } from '../../types'

interface SelectProps<V> {
  data: ListDataItem<V>[]
  value: V
  /** 默认 {value: 0, text: '全部'} */
  all?: Boolean | { value?: V; text: string }
  onChange(selected: V): void
  disabled?: boolean
  listProps?: ListProps<V>
  clean?: boolean
  popoverType?: 'focus' | 'realFocus'
  isInPopup?: boolean
  onKeyDown?(event: KeyboardEvent): void
  className?: string
  style?: CSSProperties
}

export type { SelectProps }
