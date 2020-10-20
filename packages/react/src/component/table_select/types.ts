import { ReactNode } from 'react'
import { MoreSelectProps } from '../more_select'

interface TableSelectDataItem<V> {
  value: V
  text: string
  [key: string]: any
}

interface TableSelectColumnCellProps<V> {
  original: TableSelectDataItem<V>
  index: number
}

interface TableSelectColumn<V> {
  id?: string
  accessor?: string | ((data: TableSelectDataItem<V>) => ReactNode)
  width: number
  Header: ReactNode
  Cell?: (cellProps: TableSelectColumnCellProps<V>) => ReactNode
}

interface TableSelectProps<V> extends MoreSelectProps<V> {
  data: TableSelectDataItem<V>[]
  selected: TableSelectDataItem<V>
  onSelect(selected: TableSelectDataItem<V>): void
  columns: TableSelectColumn<V>[]
}

export type { TableSelectProps, TableSelectColumn, TableSelectDataItem }
