import { ReactNode } from 'react'

type Value = any

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
  BatchActionSelectTableXProps,
  BatchActionSelectTableXBatchActionsItem,
}
