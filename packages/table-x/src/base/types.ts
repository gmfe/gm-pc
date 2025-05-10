import { Cell, CellProps, Column, ColumnInstance, Row, Accessor } from 'react-table'
import { CSSProperties, ReactNode, RefObject, UIEvent } from 'react'
import { Align, VariableSizeList } from 'react-window'
import { StringKey } from '@gm-pc/react'
import { TableComponents } from '../table'
interface TableXDataItem<V = any> {
  [key: string]: V
}

type TableXCellProps<D extends object = any> = Pick<CellProps<D>, 'row' | 'value'> & {
  index: number
  original: D
}

// 自定义的 props
interface TableXCustomerColumn<D extends object = any> {
  /** 列是否显示，DiyTableX 中的 show 与其他 TableX 不同，DiyTableX 中的 show 代表的是默认是否展示 */
  show?: boolean
  /** 列是否隐藏，优先级最高，设置为false后diy里面也显示不了 */
  hide?: boolean
  /** 固定列 */
  fixed?: 'left' | 'right'
  /** 表头是否排序 */
  headerSort?: boolean
  defaultSortDirection?: SortHeaderDirectionType
  /** 因为header有可能是组件，为了获取列的名称（为string)，故加上这个 */
  label?: string
  /** KeyboardTableX 用 */
  Cell?(props: TableXCellProps<D>): ReactNode
  accessor?: StringKey<D> | Accessor<D>
  id?: StringKey<D> | (number & {})
  /** 用来配置该列是否需要keyboard */
  isKeyboard?: boolean
  onHeaderCell?: (column: TableXColumnInstance) => Record<string, any>
  /** fixed 列默认不可以拖动，但是给个开关让他可以调整宽度 */
  isFixedCanResize?: boolean
}
// useTable 生成的 columns
type TableXColumnInstance = ColumnInstance<TableXDataItem> & TableXCustomerColumn

interface TableXCell extends Omit<Cell<TableXDataItem>, 'column'> {
  column: TableXColumnInstance
}

interface TableXRow extends Row<TableXDataItem> {
  cells: TableXCell[]
}

// 简单处理
interface TableXHeaderGroup {
  headers: TableXColumnInstance[]
}

interface TableXThProps {
  column: TableXColumnInstance
  totalWidth: number
}

interface TableXTdProps {
  cell: TableXCell
  totalWidth: number
  rowKey: string
}
type OnHeaderSort = (sortProps: {
  field: string
  direction: SortHeaderDirectionType
}) => void
interface TableXTheadProps {
  headerGroups: TableXHeaderGroup[]
  totalWidth: number
  sorts?: TableXDataItem
  onHeaderSort?: OnHeaderSort
  components?: TableComponents
  isResizable?: boolean
  id?: string
}

interface TableXTrProps {
  row: TableXRow
  keyField: string
  style: CSSProperties
  totalWidth: number
  SubComponent?(row: TableXRow): ReactNode
  isTrDisable?(original: TableXDataItem, index: number): boolean
  isTrHighlight?(original: TableXDataItem, index: number): boolean
  onRowClick?: (event: Event) => void

  /**
   * 自定义高亮类名，支持字符串或函数
   *
   * 函数返回 falsy 值则表示使用默认类名
   */
  trHighlightClass?:
    | string
    | ((original: TableXDataItem, index: number) => void | string | null)
}

/** 对外 */

// 对外 props columns
/**
 * 请使用Table的Column
 * @deprecated
 */
type TableXColumn<D extends object = any> = Omit<Column<D>, 'Cell' | 'accessor' | 'id'> &
  TableXCustomerColumn<D>
type SortsType = {
  [key: string]: SortHeaderDirectionType
}

type DiyShowMapType = TableXDataItem<string>
interface TableInstance {
  getDiyShowMap(): DiyShowMapType
  scrollToItem(index: number, align?: Align): void
  /**
   * 设置某一行高亮，并且滚动到该行
   * @param index
   */
  setHighlight(index: number): void
}
/**
 * 请使用TableProps
 * @deprecated
 */
interface TableXProps<D extends object = any> {
  id?: string
  /** 默认 value */
  keyField?: string
  columns: TableXColumn<D>[]
  data: TableXDataItem[]
  loading?: boolean
  /** table 是否平铺，准确意思应该是是否有边框 */
  tiled?: boolean
  border?: boolean
  // 头部是否支持多列排序
  headerSortMultiple?: boolean
  tableRef?: RefObject<TableInstance>
  /** 当前行禁用 */
  isTrDisable?(original: TableXDataItem, index: number): boolean
  isResizable?: boolean
  /**
   * 自定义高亮类名，支持字符串或函数
   *
   * 函数返回 falsy 值则表示使用默认类名
   */
  trHighlightClass?:
    | string
    | ((original: TableXDataItem, index: number) => void | string | null)
  isTrHighlight?(original: TableXDataItem, index: number): boolean
  onScroll?(event: UIEvent<HTMLDivElement>): void
  onHeadersSort?(sorts: SortsType): void
  SubComponent?(row: TableXRow): ReactNode
  className?: string
  style?: CSSProperties
}

interface TableXVirtualizedProps extends TableXProps {
  /** 虚拟滚动视口高度 */
  virtualizedHeight: number
  /** 虚拟滚动行高, 在Table中默认为TABLE_X.HEIGHT_TR */
  virtualizedItemSize: number | ((index: number) => number)
  refVirtualized: RefObject<VariableSizeList>
}

type TableXSortType = 'desc' | 'asc' | undefined

// 不知道叫什么名字好
type TableXPropsType = TableXProps | TableXVirtualizedProps
// SortHeader排序方向
type SortHeaderDirectionType = 'asc' | 'desc' | null

export type {
  TableXDataItem,
  TableXCell,
  TableXRow,
  TableXHeaderGroup,
  TableXThProps,
  TableXTdProps,
  TableXTheadProps,
  TableXTrProps,
  // 对外
  TableXColumn,
  TableXCellProps,
  TableXProps,
  TableXVirtualizedProps,
  TableXSortType,
  TableXPropsType,
  SortHeaderDirectionType,
  OnHeaderSort,
  SortsType,
  TableInstance,
  DiyShowMapType,
}
