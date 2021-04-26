import { useRef } from 'react'
import { TableInstance } from '../base/types'
import { noop } from 'lodash'
export default function useTableRef() {
  const tableRef = useRef<Readonly<TableInstance>>(({
    getDiyShowMap: noop,
  } as unknown) as TableInstance)
  return tableRef
}
