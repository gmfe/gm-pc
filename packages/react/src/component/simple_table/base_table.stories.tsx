import React from 'react'
import { storiesOf } from '@storybook/react'
import SimpleTable from './simple_table'
import { ISimpleColumn } from './types'

interface IData {
  sku_id: string
  sku_name: string
  settle_supplier_name: string
  category_id_1_name: string
  category_id_2_name: string
}
const data: IData[] = [
  {
    sku_id: 'D13944575',
    sku_name: '大白菜',
    settle_supplier_name: '水果供应商',
    category_id_1_name: '蔬菜',
    category_id_2_name: '甘蓝类',
  },
  {
    sku_id: 'D3628124',
    sku_name: '小白菜',
    settle_supplier_name: '水果供应商',
    category_id_1_name: '蔬菜',
    category_id_2_name: '甘蓝类',
  },
]

const columns: ISimpleColumn<IData>[] = [
  {
    Header: '序号',
    id: 'index',
    width: 100,
    Cell: ({ rowIndex }) => rowIndex + 1,
    align: 'right',
  },
  {
    Header: '名字',
    id: 'sku_name',
    align: 'left',
    width: 100,
  },
  {
    Header: '供应商',
    id: 'settle_supplier_name',
    width: 100,
  },
  {
    Header: '分类1',
    id: 'category_id_1_name',
    width: 100,
    Cell: ({ text }) => {
      return text
    },
    headerSpan: 0,
  },
  {
    Header: '分类2',
    id: 'category_id_2_name',
    width: 100,
    Cell: ({ text }) => {
      return text
    },
    headerSpan: 0,
  },
  {
    Header: '分类',
    id: 'category_name',
    width: 100,
    Cell: ({ original }) => {
      return `${original.category_id_1_name} / ${original.category_id_2_name}`
    },
    headerSpan: 3,
  },
]

storiesOf('SimpleTable', module).add('default', () => (
  <SimpleTable<IData> rowKey='sku_id' data={data} columns={columns} />
))
