import { MouseEvent, ReactNode } from 'react'
import { Row } from 'react-table'
import { TableXDataItem } from '../../base/types'

type SelectTableXValue = any

interface SelectTableXProps {
  selected: SelectTableXValue[]
  onSelect(selected: SelectTableXValue[], isSelected: boolean, index?: number): void
  batchActionBar?: ReactNode
  isSelectorDisable?(item: TableXDataItem): boolean
  selectType?: 'checkbox' | 'radio'
  fixedSelect?: boolean
  /** 点击行是否要选择，对于cell有按钮、输入框、或链接的记得加上stopPropagation */
  rowSelect?: boolean
}

interface SelectTableXCellProps {
  keyField: string
  selectType?: 'checkbox' | 'radio'
  row: Row<TableXDataItem>
  isSelectorDisable?(item: TableXDataItem): boolean
}

interface SelectTableXHeaderProps {
  selectType?: 'checkbox' | 'radio'
}

interface TableXBatchActionBarItem {
  name: string
  type: 'delete' | 'edit' | 'business'
  show?: boolean
  /** 目前为了新手引导 */
  dataId?: string
  onClick?(event: MouseEvent): void
}

interface TableXBatchActionBarProps {
  /** 是否选中所有页 */
  isSelectAll?: boolean
  /** 选中多少项 */
  count: number
  /** 批量操作按钮 */
  batchActions: TableXBatchActionBarItem[]
  /** 所有页/当前页 切换函数 */
  toggleSelectAll?(isSelectAll: boolean): void
  /** 点击关闭 BatchActionBar 的回调函数 */
  onClose?(): void
  /** pure=true，不展示[勾选所有页内容]按钮，也没有勾选所有页相关操作 */
  pure?: boolean
}

export type {
  SelectTableXProps,
  SelectTableXCellProps,
  SelectTableXHeaderProps,
  SelectTableXValue,
  TableXBatchActionBarItem,
  TableXBatchActionBarProps,
}
