import { ReactNode } from 'react'
import { MoreSelectProps } from '../more_select'

interface TableSelectDataItem {
  value: any
  text: string
}

interface TableSelectColumnCellProps {
  original: TableSelectDataItem
  index: number
}

interface TableSelectColumn {
  id?: string
  accessor?: string | ((data: TableSelectDataItem) => ReactNode)
  width: number
  Header: ReactNode
  Cell?: (cellProps: TableSelectColumnCellProps) => ReactNode
}

interface TableSelectProps extends MoreSelectProps<any> {
  data: TableSelectDataItem[]
  selected: TableSelectDataItem
  onSelect(selected: TableSelectDataItem): void
  columns: TableSelectColumn[]
}

export type { TableSelectProps, TableSelectColumn, TableSelectDataItem }
