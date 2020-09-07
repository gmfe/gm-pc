import React from 'react'
import { sortableTableXHOC } from '../hoc'
import { TableX } from '../base'
import { store, columns } from './data'

const SortableTableX = sortableTableXHOC(TableX)

export const ComSortableTableX = () => (
  <SortableTableX
    columns={columns}
    data={store.data}
    keyField='id'
    onSortChange={(newData: any) => {
      console.log(newData.map((value: any) => value.id))
      store.setData(newData)
    }}
  />
)

export default {
  title: 'TableX/sortableTableXHOC',
}
