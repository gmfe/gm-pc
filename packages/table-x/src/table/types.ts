import { ReactNode, RefObject } from 'react'
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
import { TableXRow } from '../base/types'
export interface VirtualizedProps
  extends Pick<TableXVirtualizedProps, 'virtualizedItemSize' | 'virtualizedHeight'> {
  /** 用于计算虚拟列表高度，默认为limit = 12 */
  limit?: number
}
export type HocMiddleware = (...args: any) => ReactNode

export type Column<D extends object = any> = TableXColumn<D> &
  Pick<DiyTableXColumn, 'diyEnable' | 'diyItemText' | 'diyGroupName'>

export interface TableProps<D extends object = any>
  extends Omit<TableXProps<D>, 'columns'>,
    Omit<BoxTableProps, 'className' | 'style'>,
    SubTableXProps,
    ExpandTableXProps,
    Partial<Pick<SortableTableXProps, 'onSortChange'>>,
    Partial<BatchActionSelectTableXProps>,
    Partial<SelectTableXProps>,
    Partial<VirtualizedProps>,
    Partial<Pick<KeyboardTableXProps, 'onAddRow' | 'onBeforeDispatch'>> {
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

  /** 是否虚拟列表 */
  isVirtualized?: boolean
  /** 虚拟列表方法，scrollTo、scrollToItem、resetAfterIndex */
  refVirtualized?: RefObject<VariableSizeList>

  /** 公用属性 */
  onRowClick?(original: TableXRow, e: Event): void
}
