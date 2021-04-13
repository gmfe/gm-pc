import React from 'react'
import LevelList from '../level_list'
import { observable } from 'mobx'
import { areaData } from './constants'

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
