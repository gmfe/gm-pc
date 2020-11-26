import React from 'react'

import { TableX } from '../base'
import { expandTableXHOC } from '../hoc'
import { columns, store } from './data'

const ExpandTableX = expandTableXHOC(TableX)

export const ComExpandTableX = () => (
  <div>
    <ExpandTableX
      columns={columns}
      data={store.data}
      SubComponent={() => <div style={{ height: '50px' }}>展开内容</div>}
    />
    <div>受控 expand</div>
    <ExpandTableX
      columns={columns}
      data={store.data}
      expanded={store.expanded}
      onExpand={(expanded) => store.setExpanded(expanded)}
      SubComponent={() => <div style={{ height: '50px' }}>展开内容</div>}
      isExpandCellHidden={(cellProps) => {
        if (cellProps.row.index === 2) {
          return false
        }

        return true
      }}
    />
    <div>fixedExpand</div>
    <ExpandTableX
      columns={columns.map((column) => ({ ...column, width: 600 }))}
      data={store.data}
      SubComponent={() => <div style={{ height: '50px' }}>展开内容</div>}
      fixedExpand
    />
  </div>
)

export default {
  title: 'TableX/expandTableXHOC',
}
