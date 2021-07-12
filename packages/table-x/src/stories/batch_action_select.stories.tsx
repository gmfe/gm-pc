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
      isSelectorDisable={(item) => item.id === 'T5991-JHD-2018-07-25-00026'}
      batchActions={[
        {
          children: <BatchActionDefault>批量</BatchActionDefault>,
          onAction: (selected, isSelectAll) => {
            console.log(selected, isSelectAll)
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
        {
          children: 'disabled',
          getDisabled: () => {
            return true
          },
        },
        {
          children: 'hidden',
          getHidden: () => {
            return true
          },
        },
        {
          children: ({ selected, isSelectAll }) => {
            console.log(selected, isSelectAll)
            return (
              <div className='gm-cursor gm-text-hover-primary'>更多能力的自定义child</div>
            )
          },
        },
      ]}
    />
  </div>
)

export default {
  title: 'TableX/batchActionSelectTableXHOC',
}
