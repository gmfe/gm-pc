import { Component, ReactNode, RefObject } from 'react'
import { VariableSizeList } from 'react-window'
import { TableXColumn, TableXProps, TableXVirtualizedProps } from '../base'
import {
  DiyTableXColumn,
  ExpandTableXProps,
  SelectTableXProps,
  BatchActionSelectTableXProps,
  SubTableXProps,
  SortableTableXProps,
} from '../hoc'
import { BoxTableProps } from '@gm-pc/react'
import { KeyboardTableXProps } from '@gm-pc/keyboard'
import { TableXDataItem } from '../base/types'
import { HighlightTableXProps } from '../hoc/highlight_table_x/types'
export interface VirtualizedProps
  extends Pick<TableXVirtualizedProps, 'virtualizedItemSize' | 'virtualizedHeight'> {
  /** 用于计算虚拟列表高度，默认为limit = 12 */
  limit?: number
}
export type HocMiddleware = (...args: any) => ReactNode

export type Column<D extends object = any> = TableXColumn<D> &
  Pick<DiyTableXColumn, 'diyEnable' | 'diyItemText' | 'diyGroupName'>

export type CustomizeComponent = Component<any>

export interface TableComponents {
  header?: {
    cell?: CustomizeComponent
  }
}

export interface TableProps<D extends object = any>
  extends Omit<TableXProps<D>, 'columns'>,
    Omit<BoxTableProps, 'className' | 'style'>,
    SubTableXProps,
    ExpandTableXProps,
    Partial<Pick<SortableTableXProps, 'onSortChange'>>,
    Partial<BatchActionSelectTableXProps>,
    Partial<SelectTableXProps>,
    Partial<VirtualizedProps>,
    Partial<Pick<KeyboardTableXProps, 'onAddRow' | 'onBeforeDispatch' | 'allowAddRow'>>,
    Partial<HighlightTableXProps> {
  columns: Column<D>[]
  /** 是否需要分页 */
  isPagination?: boolean
  /** 是否Diy */
  isDiy?: boolean
  /** 是否选择 */
  isSelect?: boolean
  /** 是否批量选择, 跟isSelect的区别是action会自动回传一些操作 */
  isBatchSelect?: boolean
  /** 是否展开 */
  isExpand?: boolean
  /** 是否排序 */
  isSort?: boolean
  /** 是否编辑 */
  isEdit?: boolean
  isSub?: boolean
  /** 是否需要序号 */
  isIndex?: boolean
  /** 是否开启keyboard */
  isKeyboard?: boolean
  /**
   * 是否高亮，可以用键盘的上下键来切换高亮行
   * 按回车键会触发 onRowClick 事件，可以判断 event 是否是 KeyboardEvent 来判断
   */
  isHighlight?: boolean
  /** 是否开启伸缩列 */
  isResizable?: boolean

  /** 是否虚拟列表 */
  isVirtualized?: boolean
  /** 虚拟列表方法，scrollTo、scrollToItem、resetAfterIndex */
  refVirtualized?: RefObject<VariableSizeList>

  /** diy 字段面板 className */
  diyModalClassName?: string
  /** 表头设置中启用选定字段排序 */
  customSequence?: boolean

  /** 公用属性 */
  onRowClick?(original: TableXDataItem<any>, e: Event, index: number): void

  /** 表格插件 */
  components?: TableComponents
}
