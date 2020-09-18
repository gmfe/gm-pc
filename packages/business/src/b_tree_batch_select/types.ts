import { TableXColumn } from '@gm-pc/table-x'

type Data = any

type Value = any

interface BTreeBatchSelectItem {
  value: any
  text: string
  children?: BTreeBatchSelectItem[]
  [key: string]: any
}

interface BTreeBatchSelectProps {
  onFetchTree(): Promise<BTreeBatchSelectItem[]>
  onFetchData(item: BTreeBatchSelectItem): Promise<Data[]>
  columns: TableXColumn[]
  dataKeyField?: string
  treePositionPlaceholder?: string
  dataPositionPlaceholder?: string
  onCancel(): void
  onSelectValues(values: Value[]): void
}

export type { Value, BTreeBatchSelectItem, BTreeBatchSelectProps }
