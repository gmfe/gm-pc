import { TreeListItem, TreeWithFilter } from '../tree'
import { CSSProperties, ReactNode } from 'react'
import { FlexProps } from '../flex'

type TransferListItem = TreeListItem
type Value = any

interface TransferProps extends FlexProps {
  list: TransferListItem[]
  selectedValues: Value[]
  onSelectValues(selectedValues: Value[]): void
  /** 右侧是否以树状结构展示 */
  rightTree?: boolean

  /* 左侧树 */
  leftTitle?: string
  /** 左侧树自定义筛选 */
  leftWithFilter?: TreeWithFilter
  leftPlaceholder?: string
  /** 左侧自定义渲染叶子节点 */
  leftRenderLeafItem?(item: TransferListItem): ReactNode
  /** 左侧自定义渲染分支节点 */
  leftRenderGroupItem?(item: TransferListItem): ReactNode
  leftStyle?: CSSProperties
  leftClassName?: string

  /* 右侧树 */
  rightTitle?: string
  /** 右侧自定义筛选 */
  rightWithFilter?: TreeWithFilter
  rightPlaceholder?: string
  /** 右侧自定义渲染叶子节点 */
  rightRenderLeafItem?(item: TransferListItem): ReactNode
  /** 右侧自定义渲染分支节点 */
  rightRenderGroupItem?(item: TransferListItem): ReactNode
  rightStyle?: CSSProperties
  rightClassName?: string

  hideToLeftBtn?: boolean
}

export type { Value, TransferProps, TransferListItem }
