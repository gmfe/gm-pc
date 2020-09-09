import { TableXProps, TableXColumn, TableXDataItem } from '../base'
import { SelectTableXProps, SelectTableXValue, ExpandTableXProps } from '../hoc'

interface TableXChildData extends TableXDataItem {
  children: TableXDataItem[]
}

interface TableXChildSubProps {
  columns: TableXColumn[]
  keyField?: string
}

interface TableXChildSelectedTree {
  [key: string]: SelectTableXValue[]
}

interface TableXChildProps
  extends Omit<TableXProps, 'data'>,
    Omit<SelectTableXProps, 'onSelect'>,
    ExpandTableXProps {
  data: TableXChildData[]
  subProps: TableXChildSubProps
  // todo
  onSelect(selected: SelectTableXValue[], selectedTree: TableXChildSelectedTree): void
}

export type { TableXChildProps, TableXChildSelectedTree }
