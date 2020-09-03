import React, { useMemo } from 'react'
import { MoreSelectDataItem } from '@gm-pc/react'
import _ from 'lodash'
import { action, observable } from 'mobx'
import {
  TableX,
  TableXUtil,
  selectTableXHOC,
  TableXProps,
  editTableXHOC,
} from '@gm-pc/table-x'

import {
  KCMoreSelect,
  KeyboardTableXColumn,
  keyboardTableXHOC,
  KeyboardTableXProps,
  KCInput,
  KCDatePicker,
  KCSelect,
  KCInputNumber,
} from './'

const { OperationCell, OperationHeader, EditOperation, TABLE_X } = TableXUtil
const SelectKeyboardTableX = selectTableXHOC<
  InitialDataOptions,
  KeyboardTableXProps<InitialDataOptions> & TableXProps<InitialDataOptions>
>(keyboardTableXHOC<InitialDataOptions>(editTableXHOC<InitialDataOptions>(TableX)))

interface InitialDataOptions {
  id: number
  position: MoreSelectDataItem | null
  name: string
  age: number | null
  date: Date | null
  status: number | null
}

const selectData: MoreSelectDataItem[] = [
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

const initialDataItem: InitialDataOptions = {
  id: Math.floor(Math.random() * 10),
  name: '',
  position: null,
  age: null,
  date: new Date(),
  status: 1,
}

const initialData: InitialDataOptions[] = _.times(
  5,
  (): InitialDataOptions => initialDataItem
)

class Store {
  @observable data = initialData

  @observable selected: number[] = []

  @action setSelected = (selected: number[]) => {
    this.selected = selected
  }

  @action handleAddRow = (index = this.data.length) => {
    this.data.splice(index, 0, initialDataItem)
  }

  @action handleDeleteRow = (index: number) => {
    this.data.splice(index, 1)
  }

  @action handleSetDataItem = (index: number, item: Partial<InitialDataOptions>) => {
    this.data[index] = { ...this.data[index], ...item }
  }
}

const store = new Store()

export const ComKeyboard = () => {
  const columns: KeyboardTableXColumn<InitialDataOptions>[] = useMemo(
    (): KeyboardTableXColumn<InitialDataOptions>[] => [
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
        width: TABLE_X.WIDTH_OPERATION,
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
        Cell: (cellProps: {
          row: {
            original: { position: MoreSelectDataItem }
            index: number
          }
        }) => {
          const {
            original: { position },
            index,
          } = cellProps.row
          return (
            <KCMoreSelect
              data={selectData}
              selected={position}
              onSelect={(selected: MoreSelectDataItem) => {
                store.handleSetDataItem(index, { position: selected })
              }}
            />
          )
        },
      },
      {
        Header: '名字',
        id: 'name',
        isKeyboard: true,
        Cell: (cellProps: { row: { original: { name: string }; index: number } }) => {
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
        isKeyboard: true,
        Cell: (cellProps: { row: { original: { age: number }; index: number } }) => {
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
        isKeyboard: true,
        Cell: (cellProps: { row: { original: { date: Date }; index: number } }) => {
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
        isKeyboard: true,
        Cell: (cellProps: { row: { original: { status: number }; index: number } }) => {
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
      />
    </div>
  )
}

export default {
  title: 'Keyboard/Keyboard',
}
