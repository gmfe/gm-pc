import { Cell, Column, ColumnInstance, HeaderGroup, Row } from 'react-table'
import { CSSProperties, ReactNode, RefObject, UIEvent } from 'react'
import { VariableSizeList } from 'react-window'

interface TableXDataItem {
  [key: string]: any
}

// 自定义的 props
interface TableXCustomerColumn {
  show?: boolean
  /** 固定列 */
  fixed?: 'left' | 'right'
}

// useTable 生成的 columns
interface TableXColumnInstance extends ColumnInstance, TableXCustomerColumn {}

interface TableXCell extends Omit<Cell, 'column'> {
  column: TableXColumnInstance
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
  headerGroups: HeaderGroup[]
  totalWidth: number
}

interface TableXTrProps {
  // TODO
  row: Row<TableXDataItem>
  keyField: string
  style: CSSProperties
  totalWidth: number
  SubComponent?(row: Row): ReactNode
  isTrDisable?(original: TableXDataItem, index: number): boolean
  isTrHighlight?(original: TableXDataItem, index: number): boolean
}

// 对外 props columns
type TableXColumn = Column<TableXDataItem> & TableXCustomerColumn

interface TableXProps {
  id?: string
  columns: TableXColumn[]
  data: TableXDataItem[]
  loading?: boolean
  SubComponent?(row: Row<TableXDataItem>): ReactNode
  /** 目前由 HOC 透传下来 */
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

type TableXPropsType = TableXProps | TableXVirtualizedProps

export type {
  TableXDataItem,
  TableXCell,
  TableXThProps,
  TableXTdProps,
  TableXTheadProps,
  TableXTrProps,
  TableXColumn,
  TableXProps,
  TableXVirtualizedProps,
  TableXSortType,
  TableXPropsType,
}
