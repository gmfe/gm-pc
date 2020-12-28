import React from 'react'
import { storiesOf } from '@storybook/react'
import SimpleTable from './simple_table'
import { ISimpleColumn } from './types'

const getColSpan = (rowIndex: number) => {
  let span
  if (rowIndex === 4) {
    span = 0
  }
  return span
}

interface IData {
  key: string
  name: string
  age: number
  tel: string
  phone: number
  address: string
}
const columns: ISimpleColumn<IData>[] = [
  {
    Header: 'Name',
    id: 'name',
    getColSpan: (rowIndex) => {
      let span
      if (rowIndex >= 4) {
        span = 5
      }
      return span
    },
  },
  {
    Header: 'Age(宽度400px)',
    id: 'age',
    width: 400,
    getColSpan: getColSpan,
  },
  {
    Header: 'Home phone',
    headerSpan: 2,
    id: 'tel',
    getRowSpan: (rowIndex) => {
      let span
      if (rowIndex === 2) {
        span = 2
      }
      if (rowIndex === 3) {
        span = 0
      }
      return span
    },
    getColSpan: getColSpan,
  },
  {
    Header: 'Phone',
    headerSpan: 0,
    id: 'phone',
    getColSpan: getColSpan,
  },
  {
    Header: 'Address',
    id: 'address',
    getColSpan: getColSpan,
  },
]

const data: IData[] = [
  {
    key: '1',
    name: 'John Red',
    age: 32,
    tel: '0571-22098909',
    phone: 18889898989,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    tel: '0571-22098333',
    phone: 18889898888,
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'London No. 2 Lake Park',
  },
  {
    key: '5',
    name: 'Jake White',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Dublin No. 2 Lake Park',
  },
]

storiesOf('SimpleTable', module).add('span', () => (
  <SimpleTable<IData> rowKey='key' data={data} columns={columns} />
))
