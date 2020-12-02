import React from 'react'
import MoreSelect from './more_select'
import _ from 'lodash'
import { observable, toJS } from 'mobx'

const store = observable({
  data: [
    {
      value: 1,
      text: '南山',
    },
    {
      value: 2,
      text: '福田',
    },
    {
      value: 3,
      text: '罗湖',
    },
    {
      value: 4,
      text: '宝安',
    },
    {
      value: 5,
      text: '福永',
    },
    {
      value: 6,
      text: '坪洲',
    },
    {
      value: 7,
      text:
        '西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡',
    },
    {
      value: 8,
      text: '西乡8',
    },
    {
      value: 9,
      text: '西乡9',
    },
    {
      value: 10,
      text: '西乡10',
    },
    {
      value: 11,
      text: '西乡11',
    },
  ],
  dataGroup: [
    {
      label: '南山',
      children: [
        {
          value: 1,
          text: '科技园',
        },
        {
          value: 2,
          text: '大冲',
        },
        {
          value: 3,
          text: '大新',
        },
      ],
    },
    {
      label: '宝安',
      children: [
        {
          value: 21,
          text: '西乡',
        },
        {
          value: 22,
          text: '固戍',
        },
      ],
    },
  ],
  selected: undefined,
  setSelected(selected: any) {
    this.selected = selected
  },
  mulSelected: [],
  setMulSelected(selected: any) {
    this.mulSelected = selected
  },
})

export const ComMoreSelect = () => (
  <div style={{ width: '200px' }}>
    <MoreSelect<number>
      data={store.data}
      selected={store.selected}
      onSelect={(selected) => {
        console.log({ selected })
        store.setSelected(selected)
      }}
    />
    <div>disabled</div>
    <MoreSelect<number>
      disabled
      data={store.data}
      selected={store.selected}
      onSelect={(selected) => {
        store.setSelected(selected)
      }}
    />
    <div>disabledClose</div>
    <MoreSelect<number>
      disabledClose
      data={store.data}
      selected={store.selected}
      onSelect={(selected) => {
        store.setSelected(selected)
      }}
    />
  </div>
)

export const ComMoreSelectForLongText = () => (
  <div style={{ width: '200px' }}>
    <MoreSelect<number>
      data={store.data}
      selected={{
        value: 7,
        text:
          '西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡',
      }}
      onSelect={(selected) => {
        store.setSelected(selected)
      }}
    />
  </div>
)

export const ComMoreSelectWithRenderListFilterType = () => (
  <MoreSelect<number>
    data={store.data}
    selected={store.selected}
    onSelect={(selected) => {
      store.setSelected(selected)
    }}
    renderListFilterType='pinyin'
  />
)
export const ComMoreSelectForScrollToSelected = () => (
  <MoreSelect<number>
    data={store.data}
    selected={{ value: 11, text: '西乡11' }}
    onSelect={(selected) => {
      store.setSelected(selected)
    }}
  />
)

export const ComMoreSelectWithOnSearch = () => (
  <MoreSelect<number>
    data={store.data}
    selected={store.selected}
    onSelect={(selected) => {
      store.setSelected(selected)
    }}
    onSearch={(searchValue) => {
      // 同步直接改变 data
      store.setSelected(
        // @ts-ignore
        _.filter(store.data, (item) => item.text.includes(searchValue))
      )
    }}
  />
)

export const ComMoreSelectWithOnSearchAsync = () => (
  <MoreSelect<number>
    data={store.data}
    selected={store.selected}
    onSelect={(selected) => {
      store.setSelected(selected)
    }}
    onSearch={(searchValue) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            // @ts-ignore
            _.filter(store.data, (item) => item.text.includes(searchValue))
          )
        }, 1000)
      })
    }}
  />
)

export const ComMoreSelectWithMultiple = () => (
  <MoreSelect<number>
    multiple
    data={store.data}
    selected={store.mulSelected}
    onSelect={(selected) => {
      store.setMulSelected(selected)
    }}
  />
)

export const ComMoreSelectWithMultipleAndOnSearch = () => {
  return (
    <MoreSelect<number>
      multiple
      data={toJS(store.data)}
      selected={toJS(store.mulSelected)}
      onSelect={(selected) => {
        store.setMulSelected(selected)
      }}
      onSearch={() => {
        store.data = [
          {
            value: 7,
            text:
              '西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡西乡',
          },
          {
            value: 8,
            text: '西乡8',
          },
        ]
      }}
    />
  )
}

export const ComMoreSelectWithIsGroupList = () => (
  <MoreSelect<number>
    isGroupList
    data={store.dataGroup.slice()}
    selected={store.selected}
    onSelect={(selected) => {
      store.setSelected(selected)
    }}
  />
)

export const ComMoreSelectWithIsGroupListMultiple = () => (
  <MoreSelect<number>
    isGroupList
    multiple
    data={store.dataGroup.slice()}
    selected={store.mulSelected}
    onSelect={(selected) => {
      store.setMulSelected(selected)
    }}
  />
)

export default {
  title: '表单/MoreSelect',
}
