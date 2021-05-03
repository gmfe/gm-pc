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
type StringOrKeyofT<T, V = keyof T> = keyof any extends V ? string : V

type RecordPartial<K, V> = {
  [P in StringOrKeyofT<K>]?: V
}

type anyCallback<T = any> = (...args: any[]) => T
export type {
  ListDataItem,
  ListGroupDataItem,
  TreeDataItem,
  StringOrKeyofT,
  RecordPartial,
  anyCallback,
}
