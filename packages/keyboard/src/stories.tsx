import React, { useMemo } from 'react'
import { MoreSelectDataItem } from '@gm-pc/react'
import _ from 'lodash'
import { makeAutoObservable } from 'mobx'
import { TableX, TableXUtil, selectTableXHOC, editTableXHOC } from '@gm-pc/table-x'

import {
  KCMoreSelect,
  KeyboardTableXColumn,
  keyboardTableXHOC,
  KCInput,
  KCDatePicker,
  KCSelect,
  KCInputNumber,
  KCLevelSelect,
} from './'

const { OperationCell, OperationHeader, EditOperation, TABLE_X } = TableXUtil
const SelectKeyboardTableX = selectTableXHOC(keyboardTableXHOC(editTableXHOC(TableX)))

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

const initialData: InitialDataItem[] = _.times(1, (): InitialDataItem => initialDataItem)

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

const store = new Store()

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
                  store.handleAddRow(index)
                }}
                onDeleteRow={
                  store.data.length > 1
                    ? () => {
                        store.handleDeleteRow(index)
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
                store.handleSetDataItem(index, { position: selected })
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
                store.handleSetDataItem(index, { area: value })
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
                store.handleSetDataItem(index, { name: event.target.value })
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
                store.handleSetDataItem(index, { age: value })
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
                store.handleSetDataItem(index, { date: value })
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
                store.handleSetDataItem(index, { status: value })
              }}
            />
          )
        },
      },
    ],
    []
  )

  return (
    <div>
      <SelectKeyboardTableX
        id='keyboard_table_x'
        columns={columns}
        onAddRow={() => {
          store.handleAddRow()
        }}
        data={store.data.slice()}
        keyField='id'
        selected={store.selected.slice()}
        onSelect={(selected: number[]) => {
          store.setSelected(selected)
        }}
        fixedSelect
      />
    </div>
  )
}

export default {
  title: 'Keyboard/Keyboard',
}
