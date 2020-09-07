import React from 'react'

import { TableX } from '../base'
import { selectTableXHOC, subTableXHOC } from '../hoc'
import { columns, store } from './data'

const SubSelectTableX = selectTableXHOC(subTableXHOC(TableX))

export const ComSubSelectTableX = () => {
  return (
    <SubSelectTableX
      SubComponent={() => (
        <SubSelectTableX
          columns={columns}
          data={store.data}
          keyField='id'
          selected={store.selected}
          onSelect={(selected: string[]) => {
            store.setSelected(selected)
          }}
        />
      )}
      columns={columns}
      data={store.data}
      keyField='id'
      selected={store.selected}
      onSelect={(selected: string[]) => store.setSelected(selected)}
    />
  )
}

export default {
  title: 'TableX/subTableXHOC',
}
