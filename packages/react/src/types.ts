import { ReactNode } from 'react'

interface ListDataItem<V> {
  value: V
  text: string
  disabled?: boolean
  [key: string]: any
}

interface ListGroupDataItem<V> {
  label: string | ReactNode
  children: ListDataItem<V>[]
}

interface TreeDataItem<V> extends ListDataItem<V> {
  children?: TreeDataItem<V>[]
}

export type { ListDataItem, ListGroupDataItem, TreeDataItem }
