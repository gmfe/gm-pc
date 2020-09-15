import { ReactNode, KeyboardEvent, CSSProperties } from 'react'

type Value = any

interface LevelSelectDataItem {
  value: Value
  text: string
  children?: LevelSelectDataItem[]
  disabled?: boolean
}

interface LevelSelectProps {
  titles?: string[]
  data: LevelSelectDataItem[]
  selected: Value[]
  onSelect(selected: Value[]): void
  disabled?: boolean
  renderSelected(selected: LevelSelectDataItem[]): ReactNode
  // @todo 只能选叶子节点
  onlySelectLeaf?: boolean
  popoverType: 'focus' | 'realFocus'
  right?: boolean
  onKeyDown?(event: KeyboardEvent): void
  style?: CSSProperties
  className?: string
}

export type { Value, LevelSelectDataItem, LevelSelectProps }
