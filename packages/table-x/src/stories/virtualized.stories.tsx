import React, { useRef } from 'react'
import { TableXVirtualized } from '../base'
import { columns, store } from './data'
import { VariableSizeList } from 'react-window'
import { TABLE_X } from '../utils'

export const ComTableXVirtualized = () => {
  const ref = useRef<VariableSizeList>(null)
  const height =
    TABLE_X.HEIGHT_HEAD_TR + Math.min(10, store.virtualData.length) * TABLE_X.HEIGHT_TR

  return (
    <div>
      <div>
        <button
          onClick={() => {
            ref.current!.scrollToItem(9, 'start')
          }}
        >
          滚到第 10 行
        </button>
      </div>
      <TableXVirtualized
        virtualizedHeight={height}
        virtualizedItemSize={TABLE_X.HEIGHT_TR}
        refVirtualized={ref}
        columns={columns}
        data={store.virtualData}
      />
    </div>
  )
}

export default {
  title: 'TableX/TableXVirtualized',
}
