import { Cell, CellProps, Column, ColumnInstance, Row } from 'react-table'
import { CSSProperties, ReactNode, RefObject, UIEvent } from 'react'
import { VariableSizeList } from 'react-window'

interface TableXDataItem {
  [key: string]: any
}

type TableXCellProps = CellProps<TableXDataItem>

// 自定义的 props
interface TableXCustomerColumn {
  show?: boolean
  /** 固定列 */
  fixed?: 'left' | 'right'
  /** KeyboardTableX 用 */
  Cell?(props: TableXCellProps): ReactNode
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
}

interface TableXTheadProps {
  headerGroups: TableXHeaderGroup[]
  totalWidth: number
}

interface TableXTrProps {
  row: TableXRow
  keyField: string
  style: CSSProperties
  totalWidth: number
  SubComponent?(row: TableXRow): ReactNode
  isTrDisable?(original: TableXDataItem, index: number): boolean
  isTrHighlight?(original: TableXDataItem, index: number): boolean
}

/** 对外 */

// 对外 props columns
type TableXColumn = Column<TableXDataItem> & TableXCustomerColumn

interface TableXProps {
  id?: string
  columns: TableXColumn[]
  data: TableXDataItem[]
  loading?: boolean
  SubComponent?(row: TableXRow): ReactNode
  /** 默认 value */
  keyField?: string
  /** table 是否平铺，准确意思应该是是否有边框 */
  tiled?: boolean
  /** 当前行禁用 */
  isTrDisable?(original: TableXDataItem, index: number): boolean
  isTrHighlight?(original: TableXDataItem, index: number): boolean
  onScroll?(event: UIEvent<HTMLDivElement>): void
  className?: string
  style?: CSSProperties
}

interface TableXVirtualizedProps extends TableXProps {
  /** 虚拟滚动视口高度 */
  virtualizedHeight: number
  /** 虚拟滚动行高 */
  virtualizedItemSize: number | ((index: number) => number)
  refVirtualized: RefObject<VariableSizeList>
}

type TableXSortType = 'desc' | 'asc' | undefined

// 不知道叫什么名字好
type TableXPropsType = TableXProps | TableXVirtualizedProps

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
}
