import React from 'react'
import { diyTableXHOC } from '../hoc'
import { TableX } from '../base'
import { store, diyColumns } from './data'

const DiyTableX = diyTableXHOC(TableX)

export const ComDiyTableX = () => (
  <DiyTableX
    data={store.data}
    id='default'
    diyGroupSorting={['基础', '其他']}
    columns={diyColumns}
  />
)

export default {
  title: 'TableX/diyTableXHOC',
}
