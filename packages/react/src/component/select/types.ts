import { ListProps } from '../list'
import { CSSProperties, KeyboardEvent } from 'react'
import { ListDataItem } from '../../types'

interface SelectProps<V> {
  data: ListDataItem<V>[]
  value: V
  all?: Boolean
  allText?: string
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
