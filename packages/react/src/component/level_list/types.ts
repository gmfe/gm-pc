import { ListBaseDataItem } from '../list'
import { CSSProperties } from 'react'

type Value = any

interface LevelListDataItem extends ListBaseDataItem {
  children?: LevelListDataItem[]
}

interface LevelListProps {
  data: LevelListDataItem[]
  selected: Value[]
  onSelect(selected: Value[]): void
  willActiveSelected: Value[]
  onWillActiveSelect(selected: Value[]): void
  titles?: string[]
  // @todo 未完成
  onlySelectLeaf?: boolean
  isReverse?: boolean
  className?: string
  style?: CSSProperties
  /* 内部用，暂时这么处理 */
  isForFunctionSet?: boolean
}

export type { Value, LevelListDataItem, LevelListProps }
