import React from 'react'
import { diyTableXHOC } from '../hoc'
import { TableX } from '../base'
import { store, columns, diyColumns } from './data'

const DiyTableX = diyTableXHOC(TableX)

export const ComDiyTableX = () => (
  <div>
    <DiyTableX data={store.data} id='columns' columns={columns} />
    <div>column with diyGroupName</div>
    <DiyTableX data={store.data} id='diyColumns' columns={diyColumns} />
  </div>
)

export default {
  title: 'TableX/diyTableXHOC',
}
