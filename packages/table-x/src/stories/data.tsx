import React from 'react'
import { action, computed, observable, makeAutoObservable } from 'mobx'
import { TableXColumn, TableXSortType } from '../base'
import moment from 'moment'
import { observer } from 'mobx-react'
import { EditOperation, OperationHeader, SortHeader } from '../components'
import _ from 'lodash'
import { TABLE_X } from '../utils'
import { Input, InputNumber, MoreSelect, MoreSelectDataItem } from '@gm-pc/react'

const selectData: MoreSelectDataItem<number>[] = [
  { value: 1, text: '南山' },
  { value: 2, text: '福田' },
  { value: 3, text: '罗湖' },
  { value: 4, text: '宝安' },
]

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
  },
  {
    totalMoney: 279,
    id: 'T5991-JHD-2018-07-25-00025',
    skuMoney: '279.02',
    supplierCustomerId: 'sc215',
    submitTime: '2018-07-27',
    status: 2,
    supplierName: '黑市桥蔬菜批发',
    dateTime: '2018-07-25',
    deltaMoney: -2.0,
    settleSupplierId: 'T13324',
    address: {
      value: 4,
      text: '宝安',
    },
  },
  {
    totalMoney: 176,
    id: 'T5991-JHD-2018-07-25-0002122',
    skuMoney: '279.02',
    supplierCustomerId: 'sc215',
    submitTime: '2018-07-27',
    status: 2,
    supplierName: '黑市桥蔬菜批发',
    dateTime: '2018-07-25',
    deltaMoney: -2.0,
    settleSupplierId: 'T13324',
    address: {
      value: 4,
      text: '宝安',
    },
  },
  {
    totalMoney: 176,
    id: 'T5991-JHD-2018-07-25-000123',
    skuMoney: '279.02',
    supplierCustomerId: 'sc215',
    submitTime: '2018-07-27',
    status: 2,
    supplierName: '黑市桥蔬菜批发',
    dateTime: '2018-07-25',
    deltaMoney: -2.0,
    settleSupplierId: 'T13324',
    address: {
      value: 4,
      text: '宝安',
    },
  },
  {
    totalMoney: 176,
    id: 'T5991-JHD-2018-07-25-000263',
    skuMoney: '279.02',
    supplierCustomerId: 'sc215',
    submitTime: '2018-07-27',
    status: 2,
    supplierName: '黑市桥蔬菜批发',
    dateTime: '2018-07-25',
    deltaMoney: -2.0,
    settleSupplierId: 'T13324',
    address: {
      value: 4,
      text: '宝安',
    },
  },
  {
    totalMoney: 176,
    id: 'T5991-JHD-2018-07-25-000278',
    skuMoney: '279.02',
    supplierCustomerId: 'sc215',
    submitTime: '2018-07-27',
    status: 2,
    supplierName: '黑市桥蔬菜批发',
    dateTime: '2018-07-25',
    deltaMoney: -2.0,
    settleSupplierId: 'T13324',
    address: {
      value: 4,
      text: '宝安',
    },
  },
  {
    totalMoney: 176,
    id: 'T5991-JHD-2018-07-25-00023224',
    skuMoney: '279.02',
    supplierCustomerId: 'sc215',
    submitTime: '2018-07-27',
    status: 2,
    supplierName: '黑市桥蔬菜批发',
    dateTime: '2018-07-25',
    deltaMoney: -2.0,
    settleSupplierId: 'T13324',
    address: {
      value: 4,
      text: '宝安',
    },
  },
  {
    totalMoney: 176,
    id: 'T5991-JHD-2018-07-25-00023123244',
    skuMoney: '279.02',
    supplierCustomerId: 'sc215',
    submitTime: '2018-07-27',
    status: 2,
    supplierName: '黑市桥蔬菜批发',
    dateTime: '2018-07-25',
    deltaMoney: -2.0,
    settleSupplierId: 'T13324',
    address: {
      value: 4,
      text: '宝安',
    },
  },
  {
    totalMoney: 176,
    id: 'T5991-JHD-2018-07-25-00024231',
    skuMoney: '279.02',
    supplierCustomerId: 'sc215',
    submitTime: '2018-07-27',
    status: 2,
    supplierName: '黑市桥蔬菜批发',
    dateTime: '2018-07-25',
    deltaMoney: -2.0,
    settleSupplierId: 'T13324',
    address: {
      value: 4,
      text: '宝安',
    },
  },
  {
    totalMoney: 176,
    id: 'T5991-JHD-2018-07-25-000265757',
    skuMoney: '279.02',
    supplierCustomerId: 'sc215',
    submitTime: '2018-07-27',
    status: 2,
    supplierName: '黑市桥蔬菜批发',
    dateTime: '2018-07-25',
    deltaMoney: -2.0,
    settleSupplierId: 'T13324',
    address: {
      value: 4,
      text: '宝安',
    },
  },
  {
    totalMoney: 176,
    id: 'T5991-JHD-2018-07-25-0002545',
    skuMoney: '279.02',
    supplierCustomerId: 'sc215',
    submitTime: '2018-07-27',
    status: 2,
    supplierName: '黑市桥蔬菜批发',
    dateTime: '2018-07-25',
    deltaMoney: -2.0,
    settleSupplierId: 'T13324',
    address: {
      value: 4,
      text: '宝安',
    },
  },
  {
    totalMoney: 176,
    id: 'T5991-JHD-2018-07-25-0002345',
    skuMoney: '279.02',
    supplierCustomerId: 'sc215',
    submitTime: '2018-07-27',
    status: 2,
    supplierName: '黑市桥蔬菜批发',
    dateTime: '2018-07-25',
    deltaMoney: -2.0,
    settleSupplierId: 'T13324',
    address: {
      value: 4,
      text: '宝安',
    },
  },
  {
    totalMoney: 176,
    id: 'T5991-JHD-2018-07-25-0008784',
    skuMoney: '279.02',
    supplierCustomerId: 'sc215',
    submitTime: '2018-07-27',
    status: 2,
    supplierName: '黑市桥蔬菜批发',
    dateTime: '2018-07-25',
    deltaMoney: -2.0,
    settleSupplierId: 'T13324',
    address: {
      value: 4,
      text: '宝安',
    },
  },
  {
    totalMoney: 176,
    id: 'T5991-JHD-2018-07-25-0056724',
    skuMoney: '279.02',
    supplierCustomerId: 'sc215',
    submitTime: '2018-07-27',
    status: 2,
    supplierName: '黑市桥蔬菜批发',
    dateTime: '2018-07-25',
    deltaMoney: -2.0,
    settleSupplierId: 'T13324',
    address: {
      value: 4,
      text: '宝安',
    },
  },
  {
    totalMoney: 176,
    id: 'T5991-JHD-2018-07-25-0345024',
    skuMoney: '279.02',
    supplierCustomerId: 'sc215',
    submitTime: '2018-07-27',
    status: 2,
    supplierName: '黑市桥蔬菜批发',
    dateTime: '2018-07-25',
    deltaMoney: -2.0,
    settleSupplierId: 'T13324',
    address: {
      value: 4,
      text: '宝安',
    },
  },
  {
    totalMoney: 176,
    id: 'T5991-JHD-2018-07-25-00665024',
    skuMoney: '279.02',
    supplierCustomerId: 'sc215',
    submitTime: '2018-07-27',
    status: 2,
    supplierName: '黑市桥蔬菜批发',
    dateTime: '2018-07-25',
    deltaMoney: -2.0,
    settleSupplierId: 'T13324',
    address: {
      value: 4,
      text: '宝安',
    },
  },
  {
    totalMoney: 176,
    id: 'T5991-JHD-2018-07-25-5640024',
    skuMoney: '279.02',
    supplierCustomerId: 'sc215',
    submitTime: '2018-07-27',
    status: 2,
    supplierName: '黑市桥蔬菜批发',
    dateTime: '2018-07-25',
    deltaMoney: -2.0,
    settleSupplierId: 'T13324',
    address: {
      value: 4,
      text: '宝安',
    },
  },
  {
    totalMoney: 176,
    id: 'T5991-JHD-2018-07-25-00434024',
    skuMoney: '279.02',
    supplierCustomerId: 'sc215',
    submitTime: '2018-07-27',
    status: 2,
    supplierName: '黑市桥蔬菜批发',
    dateTime: '2018-07-25',
    deltaMoney: -2.0,
    settleSupplierId: 'T13324',
    address: {
      value: 4,
      text: '宝安',
    },
  },
  {
    totalMoney: 176,
    id: 'T5991-JHD-2018-07-25-00766024',
    skuMoney: '279.02',
    supplierCustomerId: 'sc215',
    submitTime: '2018-07-27',
    status: 2,
    supplierName: '黑市桥蔬菜批发',
    dateTime: '2018-07-25',
    deltaMoney: -2.0,
    settleSupplierId: 'T13324',
    address: {
      value: 4,
      text: '宝安',
    },
  },
  {
    totalMoney: 176,
    id: 'T5991-JHD-2018-07-25-420024',
    skuMoney: '279.02',
    supplierCustomerId: 'sc215',
    submitTime: '2018-07-27',
    status: 2,
    supplierName: '黑市桥蔬菜批发',
    dateTime: '2018-07-25',
    deltaMoney: -2.0,
    settleSupplierId: 'T13324',
    address: {
      value: 4,
      text: '宝安',
    },
  },
  {
    totalMoney: 176,
    id: 'T5991-JHD-2018-07-25-0053524',
    skuMoney: '279.02',
    supplierCustomerId: 'sc215',
    submitTime: '2018-07-27',
    status: 2,
    supplierName: '黑市桥蔬菜批发',
    dateTime: '2018-07-25',
    deltaMoney: -2.0,
    settleSupplierId: 'T13324',
    address: {
      value: 4,
      text: '宝安',
    },
  },
  {
    totalMoney: 176,
    id: 'T5991-JHD-2018-07-25-4243024',
    skuMoney: '279.02',
    supplierCustomerId: 'sc215',
    submitTime: '2018-07-27',
    status: 2,
    supplierName: '黑市桥蔬菜批发',
    dateTime: '2018-07-25',
    deltaMoney: -2.0,
    settleSupplierId: 'T13324',
    address: {
      value: 4,
      text: '宝安',
    },
  },
  {
    totalMoney: 176,
    id: 'T5991-JHD-2018-07-25-532524',
    skuMoney: '279.02',
    supplierCustomerId: 'sc215',
    submitTime: '2018-07-27',
    status: 2,
    supplierName: '黑市桥蔬菜批发',
    dateTime: '2018-07-25',
    deltaMoney: -2.0,
    settleSupplierId: 'T13324',
    address: {
      value: 4,
      text: '宝安',
    },
  },
  {
    totalMoney: 176,
    id: 'T5991-JHD-2018-07-25-897924',
    skuMoney: '279.02',
    supplierCustomerId: 'sc215',
    submitTime: '2018-07-27',
    status: 2,
    supplierName: '黑市桥蔬菜批发',
    dateTime: '2018-07-25',
    deltaMoney: -2.0,
    settleSupplierId: 'T13324',
    address: {
      value: 4,
      text: '宝安',
    },
  },
  {
    totalMoney: 176,
    id: 'T5991-JHD-2018-07-25-6456024',
    skuMoney: '279.02',
    supplierCustomerId: 'sc215',
    submitTime: '2018-07-27',
    status: 2,
    supplierName: '黑市桥蔬菜批发',
    dateTime: '2018-07-25',
    deltaMoney: -2.0,
    settleSupplierId: 'T13324',
    address: {
      value: 4,
      text: '宝安',
    },
  },
]

const columns: TableXColumn<typeof initData[0]>[] = [
  {
    Header: '序号',
    id: 'index',
    Cell: (cellProps: any) => cellProps.row.index + 1,
    width: 100,
  },
  {
    Header: '始终隐藏的，不出现在diy',
    accessor: 'hide',
    minWidth: 80,
    hide: true,
    Cell: (cellProps) => {
      return <div>{cellProps.value}</div>
    },
  },
  { Header: '建单时间', show: false, accessor: 'submitTime', minWidth: 200 },
  { Header: '地址', accessor: 'address.text' as any, width: 200, maxWidth: 200 },
  {
    Header: '供应商信息',
    width: 500,
    minWidth: 500,
    accessor: (data) => data.supplierName,
    id: 'supplierName',
  },
  {
    Header: '入库金额',
    accessor: 'totalMoney',
    minWidth: 500,
    Cell: (cellProps) => {
      return <div>{cellProps.value}</div>
    },
  },
  {
    id: 'operation',
    Header: <OperationHeader />,
    width: TABLE_X.WIDTH_OPERATION,
    fixed: 'right',
    Cell: () => <div>asfas</div>,
  },
]

// 不建议使用 group 形式
const groupColumns = [
  {
    Header: '序号',
    columns: [
      {
        Header: '序号',
        accessor: 'index',
        Cell: (cellProps: { row: { index: number } }) => cellProps.row.index + 1,
      },
    ],
  },
  {
    Header: '其他信息',
    columns: [
      { Header: '建单时间', accessor: 'submitTime', show: false },
      {
        Header: '入库金额',
        accessor: 'totalMoney',
        Cell: (cellProps: any) => {
          return <div>{cellProps.row.original.totalMoney}</div>
        },
      },
    ],
  },
  {
    Header: '供应商信息',
    columns: [
      { Header: '地址', accessor: 'address.text', width: 200 },
      {
        Header: '供应商名字',
        accessor: (data: any) => data.supplierName,
        id: 'supplierName',
      },
    ],
  },
]

const sortColumns: TableXColumn[] = [
  {
    Header: observer(() => (
      <div>
        建单时间
        <SortHeader
          type={store.sortType}
          onChange={(type: any) => {
            store.setSortType(type)
          }}
        />
      </div>
    )),
    accessor: 'submitTime',
  },
  {
    Header: 'ID',
    accessor: 'id',
    width: 200,
  },
  {
    Header: '供应商信息',
    accessor: (data: any) => data.supplierName,
    id: 'supplierName',
  },
  {
    Header: '入库金额',
    accessor: 'totalMoney',
    Cell: (cellProps: any) => {
      return <div>{cellProps.row.original.totalMoney}</div>
    },
  },
]

const fixedColumns: TableXColumn[] = [
  {
    Header: '序号',
    id: 'index',
    fixed: 'left' as 'left',
    width: 150,
    Cell: (cellProps: { row: { index: number } }) => cellProps.row.index + 1,
  },
  { Header: '编号', accessor: 'id', width: 100, fixed: 'left' },
  { Header: '地址', accessor: 'address.text' as any, width: 500 },
  { Header: '商品价格', accessor: 'skuMoney', width: 300 },
  { Header: '供应商编号', accessor: 'supplierCustomerId', width: 300 },
  { Header: '提交时间', accessor: 'submitTime', width: 300 },
  { Header: 'delta money', accessor: 'deltaMoney', width: 300 },
  {
    Header: '供应商信息',
    width: 500,
    accessor: (data: any) => data.supplierName,
    id: 'supplierName',
  },
  {
    Header: '入库金额',
    width: 200,
    fixed: 'right',
    Cell: (cellProps: any) => <div>{cellProps.row.original.totalMoney}</div>,
  },
]

const editColumns = [
  {
    Header: '序号',
    id: 'no',
    width: TABLE_X.WIDTH_NO,
    maxWidth: TABLE_X.WIDTH_NO,
    Cell: (cellProps: { row: { index: number } }) => cellProps.row.index + 1,
  },
  {
    id: 'operation',
    Header: <OperationHeader />,
    width: TABLE_X.WIDTH_OPERATION,
    maxWidth: TABLE_X.WIDTH_OPERATION,
    Cell: (cellProps: { row: { index: number } }) => (
      <EditOperation
        onAddRow={
          cellProps.row.index !== 2
            ? () => console.log('增加一行', cellProps.row.index)
            : undefined
        }
        onDeleteRow={
          cellProps.row.index !== 1
            ? () => console.log('删除一行', cellProps.row.index)
            : undefined
        }
      />
    ),
  },
  {
    Header: '地址',
    Cell: (cellProps: {
      row: {
        original: {
          address: MoreSelectDataItem<number> | MoreSelectDataItem<number>[]
        }
      }
    }) => (
      <MoreSelect<number>
        selected={cellProps.row.original.address}
        data={selectData}
        onSelect={(selected) => {
          console.log(selected)
        }}
      />
    ),
  },
  {
    Header: '入库金额',
    Cell: (cellProps: {
      row: { original: { totalMoney: number | null | undefined } }
    }) => (
      <InputNumber
        value={cellProps.row.original.totalMoney}
        onChange={(value) => {
          console.log(value)
        }}
      />
    ),
  },
  {
    Header: '商品金额',
    Cell: (cellProps: {
      row: { original: { skuMoney: string | number | string[] | undefined } }
    }) => (
      <Input
        value={cellProps.row.original.skuMoney}
        onChange={(event) => {
          console.log(event.target.value)
        }}
      />
    ),
  },
]

const diyColumns = [
  {
    Header: '序号',
    id: 'index',
    diyGroupName: '基础',
    Cell: (cellProps: { row: { index: any } }) => cellProps.row.index,
  },
  { Header: 'id', accessor: 'id', diyEnable: true, diyGroupName: '基础' },
  {
    Header: '地址',
    accessor: 'address.text' as any,
    diyEnable: false,
    diyGroupName: '基础',
  },
  {
    Header: '供应商信息',
    accessor: (data: any) => data.supplierName,
    id: 'supplierName',
    diyGroupName: '其他',
  },
  {
    show: false,
    diyGroupName: '其他',
    diyEnable: true,
    Header: '入库金额',
    accessor: 'totalMoney',
    Cell: (cellProps: any) => {
      return <div>{cellProps.row.original.totalMoney}</div>
    },
  },
]

class Store {
  @observable data = initData

  @observable sortType: TableXSortType = undefined

  constructor() {
    makeAutoObservable(this)
  }

  @action setSortType = (type: TableXSortType): void => {
    this.sortType = type

    if (!type) {
      this.data = initData
    }

    let newData = this.data
      .slice()
      .sort((a, b) => +moment(a.dateTime).isBefore(moment(b.dateTime)))
    if (type === 'desc') {
      newData = newData.reverse()
    }
    this.data = newData
  }

  @action setData = (data: any) => {
    this.data = data
  }

  @computed get virtualData() {
    return _.times(200, () => {
      return initData
    }).reduce((result, value) => result.concat(value), [])
  }

  @observable selected: string[] = []

  @action setSelected = (selected: string[]) => {
    this.selected = selected
  }

  @observable isSelectedAll = false

  @action setIsSelectedAll = (selected: boolean) => {
    this.isSelectedAll = selected
    this.selected = this.data.map((value) => value.id)
  }

  // eslint-disable-next-line gm-react-app/no-observable-empty-object
  @observable expanded: { [key: number]: boolean } = {}

  @action setExpanded = (expanded: { [key: number]: boolean }) => {
    console.log(expanded)
    this.expanded = expanded
  }
}

const store = new Store()

export {
  initData,
  columns,
  groupColumns,
  sortColumns,
  fixedColumns,
  editColumns,
  diyColumns,
  store,
}
