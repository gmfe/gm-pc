import { CSSProperties } from 'react'
import { TreeDataItem } from '../../types'

interface BaseLevelListProps<V> extends LevelListProps<V> {
  willActiveSelected: V[]
  onWillActiveSelect(selected: V[]): void
}

interface LevelListProps<V> {
  data: TreeDataItem<V>[]
  selected: V[]
  onSelect(selected: V[]): void
  willActiveSelected?: V[]
  onWillActiveSelect?(selected: V[]): void
  titles?: string[]
  onlySelectLeaf?: boolean
  isReverse?: boolean
  className?: string
  style?: CSSProperties
  /* 内部用，暂时这么处理 */
  isForFunctionSet?: boolean
}

interface LevelItemProps<V> {
  title?: string
  data: TreeDataItem<V>[]
  selected?: V
  onSelect(selected: V): void
  onListItemMouseEnter?(value: TreeDataItem<V>): void
  willActiveSelected?: V
  onlySelectLeaf?: boolean
  className?: string
  style?: CSSProperties
}

export type { BaseLevelListProps, LevelListProps, LevelItemProps }
