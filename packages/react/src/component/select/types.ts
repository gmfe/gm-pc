import { ListProps } from '../list'
import { CSSProperties, KeyboardEvent } from 'react'

type Value = any

interface SelectDataOptions {
  text: string
  value: Value
  disabled?: boolean
}

interface SelectProps {
  data: SelectDataOptions[]
  value: Value
  onChange(selected: Value): void
  disabled?: boolean
  listProps?: ListProps
  canShowClose?: boolean
  clean?: boolean
  popoverType?: 'focus' | 'realFocus'
  isInPopup?: boolean
  onKeyDown?(event: KeyboardEvent): void
  className?: string
  style?: CSSProperties
}

export type { Value, SelectDataOptions, SelectProps }
