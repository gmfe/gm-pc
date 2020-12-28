import React from 'react'
import { storiesOf } from '@storybook/react'
import SimpleTable from './simple_table'
import { ISimpleColumn } from './types'

interface IData {
  category: string
  sku_name: string
  outbound: number
  price: number
  money: number
}
const columns: ISimpleColumn<IData>[] = [
  {
    Header: '序号',
    id: 'index',
    Cell: ({ rowIndex }) => rowIndex + 1,
  },
  {
    Header: '类别',
    id: 'category',
  },
  {
    Header: '商品名',
    id: 'sku_name',
  },
  {
    Header: '出库数（基本单位）',
    id: 'outbound',
    Cell: ({ text }) => (text ? `${text}斤` : ''),
  },
  {
    Header: '单价（基本单位）',
    id: 'price',
  },
  {
    Header: '出库金额',
    id: 'money',
  },
]

const data: IData[] = [
  {
    category: '熟食类',
    sku_name: '*豉油鸡',
    outbound: 3,
    price: 18.0,
    money: 54.6,
  },
  {
    category: '熟食类',
    sku_name: '*卤水猪头皮',
    outbound: 2,
    price: 18.0,
    money: 36.0,
  },
  {
    category: '熟食类',
    sku_name: '*烧肉|块',
    outbound: 2,
    price: 18.0,
    money: 36.0,
  },
  {
    category: '熟食类',
    sku_name: '*熟牛筋',
    outbound: 1,
    price: 18.0,
    money: 18.0,
  },
  {
    category: '熟食类',
    sku_name: '*利苑叉烧|包',
    outbound: 6,
    price: 18.0,
    money: 108.0,
  },
]

storiesOf('SimpleTable', module).add('noBorder', () => (
  <SimpleTable<IData> rowKey='sku_name' data={data} columns={columns} bordered={false} />
))
