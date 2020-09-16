import React from 'react'
import { TableX } from '../base'
import { selectTableXHOC } from '../hoc'
import { columns, store } from './data'

const SelectTableX = selectTableXHOC(TableX)

export const ComSelectTableX = () => (
  <SelectTableX
    columns={columns}
    data={store.data}
    keyField='id'
    onSelect={(selected: any) => store.setSelected(selected)}
    selected={store.selected}
  />
)
export const ComWithFixedSelect = () => (
  <SelectTableX
    columns={columns.map((column: any) => ({ ...column, width: 600 }))}
    data={store.data}
    keyField='id'
    selected={store.selected}
    onSelect={(selected: string[]) => store.setSelected(selected)}
    fixedSelect
  />
)
export const ComWithSelectType = () => (
  <SelectTableX
    columns={columns}
    data={store.data}
    keyField='id'
    selected={store.selected}
    onSelect={(selected: string[]) => store.setSelected(selected)}
    selectType='radio'
  />
)

export const ComWithIsSelectorDisable = () => (
  <SelectTableX
    columns={columns}
    data={store.data}
    keyField='id'
    selected={store.selected}
    isSelectorDisable={(original: any) => original.totalMoney === 176}
    onSelect={(selected: string[]) => store.setSelected(selected)}
  />
)

export default {
  title: 'TableX/selectTableXHOC',
}
