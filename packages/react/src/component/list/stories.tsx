import React from 'react'
import List from './list'
import { observable } from 'mobx'
import { ListDataItem, ListGroupDataItem } from '../../types'

const data: ListDataItem<string>[] = [
  { value: '南山', text: '南山' },
  { value: '福田', text: '福田', disabled: true },
  { value: '龙岗', text: '龙岗' },
  { value: '罗湖', text: '罗湖' },
  { value: '罗湖1', text: '罗湖1' },
  { value: '罗湖2', text: '罗湖2' },
  { value: '罗湖3', text: '罗湖3' },
  { value: '罗湖4', text: '罗湖4' },
  { value: '罗湖5', text: '罗湖5' },
]

const groupData: ListGroupDataItem<string>[] = [
  {
    label: '分组二',
    children: [
      { value: '南山', text: '南山' },
      { value: '福田', text: '福田' },
    ],
  },
  {
    label: '分组一',
    children: [
      { value: '龙岗', text: '龙岗' },
      { value: '罗湖', text: '罗湖' },
    ],
  },
]

const store = observable({
  selected: null,
  setSelected(selected: string | string[]) {
    console.log(selected)
    // @ts-ignore
    this.selected = selected
  },
})

export const ComList = () => (
  <div>
    <div className='gm-inline-block'>
      <List
        data={data}
        selected={store.selected}
        onSelect={(selected: string) => {
          store.setSelected(selected)
        }}
      />
    </div>
    <div>renderItem</div>
    <div className='gm-inline-block'>
      <List
        data={data}
        selected={store.selected}
        onSelect={(selected: string) => {
          store.setSelected(selected)
        }}
        renderItem={(item, index) => item.text + index}
      />
    </div>
  </div>
)
export const ComListWithMultiple = () => (
  <div className='gm-inline-block'>
    <List<string>
      multiple
      data={data}
      selected={store.selected || []}
      onSelect={(selected: string[]) => {
        store.setSelected(selected)
      }}
    />
  </div>
)

export const ComListWithIsGroupList = () => (
  <div className='gm-inline-block'>
    <List<string>
      data={groupData}
      isGroupList
      selected={store.selected || ''}
      onSelect={(selected: string) => {
        store.setSelected(selected)
      }}
    />
  </div>
)

export const ComListWithIsScrollTo = () => (
  <div className='gm-inline-block'>
    <List
      data={data}
      selected='罗湖5'
      onSelect={(selected: string) => {
        store.setSelected(selected)
      }}
      renderItem={(item, index) => item.text + index}
      isScrollTo
      style={{
        maxHeight: '100px',
      }}
    />
  </div>
)

export default {
  title: '表单/List',
}
