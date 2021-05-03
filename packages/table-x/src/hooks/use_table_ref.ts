import { useRef } from 'react'
import { TableInstance } from '../base/types'
import { noop } from 'lodash'

export const BASE_TABLE_REF_VALUE = {
  getDiyShowMap: noop,
}
export default function useTableRef() {
  const tableRef = useRef<Readonly<TableInstance>>(({
    ...BASE_TABLE_REF_VALUE,
  } as unknown) as TableInstance)
  return tableRef
}
