import React, { useState, useMemo } from 'react'
import { Alert, MoreSelectDataItem } from '@gm-pc/react'
import { Column, Table } from '.'
import { store } from '../stories/data'

import { makeAutoObservable } from 'mobx'
import { TableXUtil } from '../'

import {
  KCMoreSelect,
  KeyboardTableXColumn,
  KCInput,
  KCDatePicker,
  KCSelect,
  KCInputNumber,
  KCLevelSelect,
} from '@gm-pc/keyboard'
const initState = {
  isDiy: false,
  isBatchSelect: false,
  customSequence: false,
  rowSelect: false,
  isExpand: false,
  isSort: false,
  isEdit: false,
  isSub: false,
  isKeyboard: false,
  isVirtualized: false,
  isIndex: false,
}
export const ComTable = () => {
  const [state, setState] = useState<Partial<typeof initState>>({})
  const {
    isDiy,
    isBatchSelect,
    customSequence,
    isExpand,
    isSort,
    isEdit,
    isSub,
    isVirtualized,
    isIndex,
    rowSelect,
  } = state
  const [limit, setLimit] = useState(12)

  const iter = isVirtualized ? 20 : 1
  let newData = [] as typeof store.data
  for (let i = 0; i < iter; i++) {
    newData = newData.concat(
      store.data
        .slice()
        .map((item, index) => ({ ...item, id: `${item.id}.${i}.${index}` }))
    )
  }
  const buttons = Object.keys(initState)
  return (
    <>
      {buttons.map((key) => {
        const tempKey = key as keyof typeof initState
        const currentState = state[tempKey]
        return (
          <button
            key={tempKey}
            style={{ marginRight: 10, background: currentState ? '#1EA7FD' : undefined }}
            onClick={() => setState((state) => ({ ...state, [tempKey]: !currentState }))}
          >
            <span style={{ color: currentState ? 'white' : undefined }}>{`${
              currentState ? '关闭' : '打开'
            }${tempKey}`}</span>
          </button>
        )
      })}
      <h2 className='gm-margin-top-10 gm-text-red'>注意：rowSelect使用过程中不能修改</h2>
      {isVirtualized && (
        <>
          <button onClick={() => setLimit((limit) => limit + 1)}>+</button>
          <span> limit: {limit}</span>
          <button
            onClick={() =>
              setLimit((limit) => {
                if (limit === 1) {
                  Alert('limit最小为1')
                  return limit
                }
                return limit - 1
              })
            }
          >
            -
          </button>
        </>
      )}
      <Table<typeof store.data[0]>
        id='table'
        keyField='id'
        isIndex={isIndex}
        isDiy={isDiy}
        isBatchSelect={isBatchSelect}
        customSequence={customSequence}
        isExpand={isExpand}
        isSort={isSort}
        isEdit={isEdit}
        isSub={isSub}
        rowSelect={rowSelect}
        isVirtualized={isVirtualized}
        style={{ marginTop: 100 }}
        fixedSelect
        columns={([
          { Header: '建单时间', accessor: 'submitTime', minWidth: 200, fixed: 'left' },
          rowSelect && {
            Header: '链接',
            accessor: () => (
              <a
                onClick={(e) => e.stopPropagation()}
                href='https://github.com/gmfe/gm-pc'
                target='_blank'
                rel='noreferrer'
              >
                github.com/gmfe/gm-pc
              </a>
            ),
            minWidth: 200,
          },
          { Header: '商品价格', accessor: 'skuMoney', width: 300 },
          { Header: '供应商编号', accessor: 'supplierCustomerId', width: 300 },
          { Header: '地址', accessor: 'address.text' as any, width: 200, maxWidth: 200 },
          {
            Header: '供应商信息',
            width: 500,
            minWidth: 500,
            accessor: 'supplierName',
            id: 'supplierName',
          },
          {
            Header: '入库金额',
            accessor: 'totalMoney',
            id: 'totalMoney',
            minWidth: 100,
            headerSort: true,
            Cell: ({ value }) => {
              return value
            },
          },
        ] as Column<typeof store.data[0]>[]).filter(Boolean)}
        data={newData}
        batchActions={[
          {
            children: <button>点击提示选择项</button>,
            onAction: (selected, isSelected) =>
              alert(`selected = ${selected}, isSelected = ${isSelected}`),
          },
        ]}
        limit={limit}
      />
    </>
  )
}

const { OperationCell, OperationHeader, EditOperation, TABLE_X } = TableXUtil

interface InitialDataItem {
  id: number
  position: MoreSelectDataItem<number> | null
  name: string
  age: number | null
  area: string[]
  date: Date | null
  status: number | null
}

const selectData: MoreSelectDataItem<number>[] = [
  { value: 1, text: '南山' },
  { value: 2, text: '福田' },
  { value: 3, text: '宝安' },
  { value: 4, text: '罗湖' },
  { value: 5, text: '龙岗' },
  { value: 6, text: '龙华' },
  { value: 7, text: '光明' },
  { value: 8, text: '盐田' },
  { value: 9, text: '坪山' },
  { value: 10, text: '大鹏新区' },
]

const levelSelectData = [
  {
    value: 'A',
    text: '广州越秀越秀越秀越秀越秀越秀越秀越秀越秀越秀越秀越秀越秀越秀越秀',
    children: [
      {
        value: '1',
        text: '越秀越秀越秀越秀越秀越秀越秀越秀越秀越秀越秀越秀越秀越秀越秀',
      },
      { value: '2', text: '荔湾' },
      { value: '3', text: '天河' },
      { value: '4', text: '海珠' },
      { value: '5', text: '白云' },
      { value: '6', text: '黄埔' },
      { value: '7', text: '番禺' },
      { value: '8', text: '南沙' },
      { value: '9', text: '花都' },
      { value: '10', text: '增城' },
      { value: '11', text: '从化' },
    ],
  },
  {
    value: 'B',
    text: '深圳',
    children: [
      { value: '1', text: '福田' },
      { value: '2', text: '罗湖' },
      { value: '3', text: '南山' },
      { value: '4', text: '盐田' },
      { value: '5', text: '宝安' },
      { value: '6', text: '龙岗' },
      { value: '7', text: '龙华' },
      { value: '8', text: '坪山' },
      { value: '9', text: '光明' },
      { value: '10', text: '大鹏' },
    ],
  },
]

const initialDataItem: InitialDataItem = {
  id: Math.floor(Math.random() * 10),
  name: '',
  position: null,
  area: [],
  age: null,
  date: new Date(),
  status: 1,
}

const initialData: InitialDataItem[] = Array(5)
  .fill(initialDataItem)
  .map((item, index) => ({ ...item, id: index }))

class Store {
  data = initialData

  selected: number[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setSelected = (selected: number[]) => {
    this.selected = selected
  }

  handleAddRow = (index = this.data.length) => {
    this.data.splice(index, 0, initialDataItem)
  }

  handleDeleteRow = (index: number) => {
    this.data.splice(index, 1)
  }

  handleSetDataItem = (index: number, item: Partial<InitialDataItem>) => {
    this.data[index] = { ...this.data[index], ...item }
  }
}

const keyboardStore = new Store()
console.log(keyboardStore.data)
export const ComKeyboard = () => {
  const columns: KeyboardTableXColumn[] = useMemo(
    (): KeyboardTableXColumn[] => [
      {
        Header: '编号',
        id: 'no',
        fixed: 'left',
        width: TABLE_X.WIDTH_NO,
        Cell: (cellProps: { row: { index: number } }) => {
          return <div>{cellProps.row.index + 1}</div>
        },
      },
      {
        Header: OperationHeader,
        id: 'operation',
        fixed: 'left',
        width: TABLE_X.WIDTH_EDIT_OPERATION,
        Cell: (cellProps: { row: { index: number } }) => {
          const { index } = cellProps.row
          return (
            <OperationCell>
              <EditOperation
                onAddRow={() => {
                  keyboardStore.handleAddRow(index)
                }}
                onDeleteRow={
                  keyboardStore.data.length > 1
                    ? () => {
                        keyboardStore.handleDeleteRow(index)
                      }
                    : undefined
                }
              />
            </OperationCell>
          )
        },
      },
      {
        Header: '位置',
        id: 'position',
        width: TABLE_X.WIDTH_SELECT,
        isKeyboard: true,
        Cell: (cellProps: any) => {
          const {
            original: { position },
            index,
          } = cellProps.row
          return (
            <KCMoreSelect
              data={selectData}
              selected={position}
              onSelect={(selected: MoreSelectDataItem<number>) => {
                keyboardStore.handleSetDataItem(index, { position: selected })
              }}
            />
          )
        },
      },
      {
        Header: '区域',
        id: 'area',
        width: 200,
        isKeyboard: true,
        Cell: ({ row: { original, index } }) => {
          return (
            <KCLevelSelect
              data={levelSelectData}
              selected={original.area}
              onSelect={(value) => {
                keyboardStore.handleSetDataItem(index, { area: value })
              }}
            />
          )
        },
      },
      {
        Header: '名字',
        id: 'name',
        width: 200,
        isKeyboard: true,
        Cell: (cellProps: any) => {
          const {
            original: { name },
            index,
          } = cellProps.row
          return (
            <KCInput
              value={name}
              onChange={(event) => {
                keyboardStore.handleSetDataItem(index, { name: event.target.value })
              }}
            />
          )
        },
      },
      {
        Header: '年龄',
        id: 'age',
        width: 200,
        isKeyboard: true,
        Cell: (cellProps: any) => {
          const {
            original: { age },
            index,
          } = cellProps.row
          return (
            <KCInputNumber
              value={age}
              onChange={(value) => {
                keyboardStore.handleSetDataItem(index, { age: value })
              }}
            />
          )
        },
      },
      {
        Header: '日期',
        id: 'date',
        width: 200,
        isKeyboard: true,
        Cell: (cellProps: any) => {
          const {
            original: { date },
            index,
          } = cellProps.row
          return (
            <KCDatePicker
              onChange={(value) => {
                keyboardStore.handleSetDataItem(index, { date: value })
              }}
              date={date}
            />
          )
        },
      },
      {
        Header: '状态',
        id: 'status',
        width: 200,
        isKeyboard: true,
        Cell: (cellProps: any) => {
          const {
            original: { status },
            index,
          } = cellProps.row
          return (
            <KCSelect
              data={[
                { value: 0, text: '未验收' },
                { value: 1, text: '已验收' },
              ]}
              value={status}
              onChange={(value: any) => {
                keyboardStore.handleSetDataItem(index, { status: value })
              }}
            />
          )
        },
      },
    ],
    []
  )

  return (
    <div style={{ marginTop: 100 }}>
      <Table
        isEdit
        isKeyboard
        isVirtualized
        isBatchSelect
        id='keyboard_table_x'
        onRowClick={(original, e) => {
          e.stopPropagation()
          console.log('asdasdas', original, e)
        }}
        columns={columns}
        onAddRow={() => {
          keyboardStore.handleAddRow()
        }}
        data={keyboardStore.data.slice()}
        keyField='id'
        batchActions={[
          {
            children: <button>点击提示选择项</button>,
            onAction: (selected, isSelected) =>
              alert(`selected = ${selected}, isSelected = ${isSelected}`),
          },
        ]}
        fixedSelect
      />
    </div>
  )
}

export default {
  title: 'Table/Table',
}
