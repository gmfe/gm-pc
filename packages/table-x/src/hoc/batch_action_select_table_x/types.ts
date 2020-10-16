import { MouseEvent, ReactNode } from 'react'

type Value = any

interface BatchActionBarItem {
  children: string | ReactNode
  onClick(event: MouseEvent): void
  getDisabled?(selected: Value[], isSelectAll: boolean): boolean
}

interface BatchActionBarProps {
  /** 是否选中所有页 */
  isSelectAll: boolean
  selected: Value[]
  /** 选中多少项 */
  count: number
  /** 批量操作按钮 */
  batchActions: BatchActionBarItem[]
  /** 所有页/当前页 切换函数 */
  toggleSelectAll?(isSelectAll: boolean): void
  /** 点击关闭 BatchActionBar 的回调函数 */
  onClose?(): void
  /** pure=true，不展示[勾选所有页内容]按钮，也没有勾选所有页相关操作 */
  pure?: boolean
}

interface BatchActionSelectTableXBatchActionsItem {
  /** 如果需要 dataId，用 ReactNode 调用方自己弄 */
  children: string | ReactNode
  onAction(selected: Value[], isSelectAll: boolean): void
  /** 默认显示 */
  show?: boolean
  getDisabled?(selected: Value[], isSelectAll: boolean): boolean
}

interface BatchActionSelectTableXProps {
  /** 重新定义 batchActions */
  batchActions: BatchActionSelectTableXBatchActionsItem[]
  batchActionBarPure?: boolean
}

export type {
  Value,
  BatchActionBarProps,
  BatchActionBarItem,
  BatchActionSelectTableXProps,
  BatchActionSelectTableXBatchActionsItem,
}
