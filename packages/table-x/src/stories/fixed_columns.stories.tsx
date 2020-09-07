import React from 'react'
import { fixedColumnsTableXHOC } from '../hoc'
import { TableX } from '../base'
import { store, fixedColumns } from './data'

const FixedColumnsTableX = fixedColumnsTableXHOC(TableX)

export const ComFixedColumnsTableX = () => (
  <FixedColumnsTableX data={store.data} columns={fixedColumns} />
)

export default {
  title: 'TableX/fixedColumnsTableXHOC',
}
