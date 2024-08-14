import { TableXColumn } from '@gm-pc/table-x'

type KeyboardTableXColumn = {
  isKeyboard?: boolean
} & TableXColumn

interface KeyboardTableXProps {
  /* 通过 id 来确定本单元格内通信，避免多表格时混了。请确保 id 唯一 */
  id: string
  columns: KeyboardTableXColumn[]
  /** 按下键是否允许增加一行数据 */
  allowAddRow?: boolean
  /* 增加一行数据 */
  onAddRow(): void
  onBeforeDispatch?(options: {
    actionName: string
    to: { rowKey: number; columnKey: string }
    from: { rowKey: number; columnKey: string }
  }): boolean
}

type KeyboardDirection = 'left' | 'right' | 'up' | 'down'
interface KeyboardCustomEvent {
  cellKey: string
  direction: KeyboardDirection
}

interface KeyboardWrapData {
  id: string
  fixedWidths: {
    leftFixedWidth: number
    rightFixedWidth: number
  }
}

interface KeyboardCellProps {
  /** wrap 传过来的数据 */
  wrapData: KeyboardWrapData
  /** Cell 的身份标志，让 Wrap 更方便找到 */
  cellKey: string
  /** Wrap 要 focus 到单元格的时候触发 onFocus，请实现此功能 */
  onFocus(): void
  /** 表格多的时候需要滚到视窗 */
  onScroll(data: KeyboardWrapData['fixedWidths']): void
  /** 是否具有响应能力 */
  disabled?: boolean
}

interface WrapProps {
  /** 通过 id 来确定本单元格内通信，避免多表格时混了，请确保 id 唯一 */
  id: string
  /** 增加一行数据 */
  onAddRow(): void
  onBeforeDispatch?(options: {
    actionName: string
    to: { rowKey: number; columnKey: string }
    from: { rowKey: number; columnKey: string }
  }): boolean

  /** 按下键是否允许增加一行数据 */
  allowAddRow?: boolean

  /** Wrap 需要知道字段集合，以便能找到相应的单元格，请确保表格的顺序一致 */
  columnKeys: string[]
  /** Wrap 需要知道有多少行，以便能找到相应的单元格，同时必要时会触发 onAddRow，告知调用方需要增加一行数据 */
  dataLength: number
  fixedWidths: {
    leftFixedWidth: number
    rightFixedWidth: number
  }
}

type MoreSelectRef = {
  /**  默认搜索 */
  handleInitSearch: (q?: string) => void
}

export type {
  KeyboardCellProps,
  WrapProps,
  KeyboardTableXProps,
  KeyboardTableXColumn,
  KeyboardCustomEvent,
  KeyboardDirection,
  KeyboardWrapData,
  MoreSelectRef,
}
