import React from 'react'
import { TableX } from '../base'
import {
  batchActionSelectTableXHOC,
  BatchActionDefault,
  BatchActionDelete,
  BatchActionEdit,
} from '../hoc'
import { Button } from '@gm-pc/react'
import { columns, store } from './data'

const Table = batchActionSelectTableXHOC(TableX)

export const ComSelectTableX = () => (
  <div style={{ paddingTop: '100px' }}>
    <Table
      columns={columns}
      data={store.data}
      keyField='id'
      batchActions={[
        {
          children: <BatchActionDefault>批量</BatchActionDefault>,
          onAction: (selected, isSelectAll) => {
            console.log(selected, isSelectAll)
          },
          getDisabled(selected, isSelectAll: boolean): boolean {
            console.log(selected, isSelectAll)
            return true
          },
        },
        {
          children: <BatchActionDelete>删除</BatchActionDelete>,
          onAction: (selected, isSelectAll) => {
            console.log(selected, isSelectAll)
          },
        },
        {
          children: <BatchActionEdit>编辑</BatchActionEdit>,
          onAction: (selected, isSelectAll) => {
            console.log(selected, isSelectAll)
          },
        },
        {
          children: <Button>上架</Button>,
          onAction: (selected, isSelectAll) => {
            console.log(selected, isSelectAll)
          },
        },
      ]}
    />
  </div>
)

export default {
  title: 'TableX/batchActionSelectTableXHOC',
}
