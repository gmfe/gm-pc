import React from 'react'
import LevelList from './level_list'
import { observable } from 'mobx'
import { TreeDataItem } from '../../types'

const areaData: TreeDataItem<string>[] = [
  {
    value: '0',
    text: '宝安',
    children: [
      {
        value: '01',
        text: '西乡',
      },
      {
        value: '02',
        text: '固戍',
      },
    ],
  },
  {
    value: '1',
    text: '南山',
    children: [
      {
        value: '11',
        text: '科技园科技园科技园科技园科技园科技园科技园科技园科技园科技园',
        children: [
          {
            value: '111',
            text: '东区',
          },
          {
            value: '112',
            text: '西区',
          },
        ],
      },
      {
        value: '112',
        text: '科技园科',
        children: [
          {
            value: '1112',
            text: '东区',
          },
          {
            value: '1122',
            text: '西区',
          },
        ],
      },
    ],
  },
  {
    value: '2',
    text: '福田',
    children: [
      {
        value: '21',
        text: '竹子林',
        children: [
          {
            value: '211',
            text: '东区',
          },
          {
            value: '212',
            text: '西区',
          },
        ],
      },
    ],
  },
]

const store = observable({
  data: areaData,
  selected: ['1'],
  willActiveSelected: ['1'],
  setSelected(selected: any) {
    console.log(selected)
    this.selected = selected
  },
  setWillActiveSelected(willActiveSelected: any) {
    this.willActiveSelected = willActiveSelected
  },
})

export const ComLevelList = () => (
  <div className='gm-inline-block'>
    <LevelList
      data={store.data.slice()}
      selected={store.selected.slice()}
      onSelect={(selected) => {
        store.setSelected(selected)
      }}
    />
  </div>
)

export const ComLevelListWithOnlySelectLeaf = () => (
  <div className='gm-inline-block'>
    <LevelList
      data={store.data.slice()}
      selected={store.selected.slice()}
      onSelect={(selected) => {
        store.setSelected(selected)
      }}
      onlySelectLeaf
    />
  </div>
)

export const ComLevelListWithIsReverse = () => (
  <div
    style={{
      position: 'absolute',
      right: 0,
    }}
  >
    <LevelList
      data={store.data.slice()}
      selected={store.selected.slice()}
      onSelect={(selected) => {
        store.setSelected(selected)
      }}
      willActiveSelected={store.willActiveSelected.slice()}
      onWillActiveSelect={(willActiveSelected) => {
        console.log(willActiveSelected)
        store.setWillActiveSelected(willActiveSelected)
      }}
      isReverse
    />
  </div>
)

export const ComLevelListWithIsForFunctionSet = () => (
  <div className='gm-inline-block'>
    <LevelList
      data={store.data.slice()}
      selected={store.selected.slice()}
      onSelect={(selected) => {
        store.setSelected(selected)
      }}
      willActiveSelected={store.willActiveSelected.slice()}
      onWillActiveSelect={(willActiveSelected) => {
        console.log(willActiveSelected)
        store.setWillActiveSelected(willActiveSelected)
      }}
      isForFunctionSet
    />
  </div>
)

export default {
  title: '表单/LevelList',
}
