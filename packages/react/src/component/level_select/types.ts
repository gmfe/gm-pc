import { ReactNode, KeyboardEvent, CSSProperties } from 'react'
import { TreeDataItem } from '../../types'

type LevelSelectDataItem<V> = TreeDataItem<V>

interface LevelSelectProps<V> {
  titles?: string[]
  data: LevelSelectDataItem<V>[]
  selected: V[]
  onSelect(selected: V[]): void
  disabled?: boolean
  renderSelected?(selected: LevelSelectDataItem<V>[]): ReactNode
  onlySelectLeaf?: boolean
  popoverType?: 'focus' | 'realFocus'
  right?: boolean
  onKeyDown?(event: KeyboardEvent): void
  style?: CSSProperties
  className?: string
}

interface MultipleLevelSelectProps<V> {
  data: LevelSelectDataItem<V>[]
  selected: V[][]
  onSelect(selected: V[][]): void
  disabled?: boolean
  renderSelected?(items: LevelSelectDataItem<V>[]): ReactNode
  titles?: string[]
  onlySelectLeaf?: boolean
  popoverType?: 'focus' | 'realFocus'
  right?: boolean
  placeholder?: string
  onKeyDown?(event: KeyboardEvent): void
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

export type { LevelSelectDataItem, LevelSelectProps, MultipleLevelSelectProps }
