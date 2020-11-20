import React from 'react'
import getTableXChild from './get_table_x_child'
import { TableX } from '../base'
import { selectTableXHOC, expandTableXHOC, subTableXHOC } from '../hoc'
import { observable } from 'mobx'

const TableOne = selectTableXHOC(expandTableXHOC(TableX))
const TableTwo = selectTableXHOC(subTableXHOC(TableX))

const Table = getTableXChild(TableOne, TableTwo)

const initData = [
  {
    totalMoney: 111,
    id: 'T5991-JHD-2018-07-25-00027',
    skuMoney: '2390.00',
    supplierCustomerId: 'LDP20180117',
    submitTime: '2018-07-25',
    status: 2,
    supplierName: '-',
    dateTime: '2018-07-25',
    deltaMoney: 0,
    settleSupplierId: 'T10953',
    address: {
      value: 33,
      text: '西乡fdsfsdf9',
    },
    children: [
      {
        id: 1,
        name: '小明',
        age: 20,
      },
      {
        id: 2,
        name: '小红',
        age: 20,
      },
    ],
  },
  {
    totalMoney: 176,
    id: 'T5991-JHD-2018-07-25-00026',
    skuMoney: '176.00',
    supplierCustomerId: 'A2926',
    submitTime: '2018-07-26',
    status: 2,
    supplierName: '段虎',
    dateTime: '2018-07-25',
    deltaMoney: 0,
    settleSupplierId: 'T14319',
    address: {
      value: 9,
      text: '西乡9',
    },
    children: [
      {
        id: 3,
        name: '小小',
        age: 30,
      },
      {
        id: 4,
        name: '小大',
        age: 30,
      },
    ],
  },
]

const store = observable({
  selected: [],
  setSelected(selected: any) {
    this.selected = selected
  },
})

export const ComTableXChild = () => {
  return (
    <Table
      data={initData}
      keyField='id'
      columns={[
        {
          Header: '序号',
          id: 'index',
          Cell: (cellProps: { row: { index: number } }) => cellProps.row.index + 1,
        },
        { Header: '建单时间', show: false, accessor: 'submitTime' },
        { Header: '地址', accessor: 'address.text' },
      ]}
      subProps={{
        keyField: 'id',
        columns: [
          {
            Header: '子序号',
            id: 'index',
            Cell: (cellProps: { row: { index: number } }, row) => {
              return `${row.index + 1} - ${cellProps.row.index + 1}`
            },
          },
          {
            Header: 'ID',
            accessor: 'id',
          },
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'Age',
            accessor: 'age',
          },
        ],
      }}
      selected={store.selected.slice()}
      onSelect={(selected, selectedTree) => {
        console.log(selectedTree)
        store.setSelected(selected)
      }}
    />
  )
}

export default {
  title: 'TableX/getTableXChild',
}
