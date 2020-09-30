import { ListProps } from '../list'
import { CSSProperties, KeyboardEvent } from 'react'

type Value = any

interface SelectDataItem {
  text: string
  value: Value
  disabled?: boolean
}

interface SelectProps {
  data: SelectDataItem[]
  value: Value
  all?: Boolean
  allText?: string
  onChange(selected: Value): void
  disabled?: boolean
  listProps?: ListProps
  clean?: boolean
  popoverType?: 'focus' | 'realFocus'
  isInPopup?: boolean
  onKeyDown?(event: KeyboardEvent): void
  className?: string
  style?: CSSProperties
}

export type { Value, SelectDataItem, SelectProps }
