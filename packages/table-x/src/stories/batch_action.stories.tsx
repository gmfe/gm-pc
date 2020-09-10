import React from 'react'
import { TableX } from '../base'
import { batchActionTableXHOC } from '../hoc'
import { columns, store } from './data'

const Table = batchActionTableXHOC(TableX)

export const ComSelectTableX = () => (
  <div style={{ paddingTop: '100px' }}>
    <Table
      columns={columns}
      data={store.data}
      keyField='id'
      batchActions={[
        {
          children: '批量',
          onAction: (selected, isSelectAll) => {
            console.log(selected, isSelectAll)
          },
        },
      ]}
    />
  </div>
)

export default {
  title: 'TableX/batchActionTableXHOC',
}
