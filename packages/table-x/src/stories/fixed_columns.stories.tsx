import React from 'react'
import { fixedColumnsTableXHOC } from '../hoc'
import { TableX } from '../base'
import { store, fixedColumns } from './data'

const FixedColumnsTableX = fixedColumnsTableXHOC(TableX)

export const ComFixedColumnsTableX = () => (
  <div>
    <FixedColumnsTableX data={store.data} columns={fixedColumns} />
    <div>没数据的时候</div>
    <FixedColumnsTableX data={[]} columns={fixedColumns} />
  </div>
)

export default {
  title: 'TableX/fixedColumnsTableXHOC',
}
