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
  value: undefined,
  onChange(value: any) {
    this.value = value
  },
  setSelected(selected: any) {
    this.selected = selected
  },
  mulSelected: [],
  setMulSelected(selected: any) {
    this.mulSelected = selected
  },
  clickFn(selected: any) {
    this.selected = selected
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
    <div>不传任何prop，也不会报错</div>
    <MoreSelect placeholder='不传任何prop，也不会报错' />
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
export const ComMoreSelectByValue = () => (
  <div style={{ width: '200px' }}>
    <MoreSelect<number>
      data={store.data}
      value={store.value}
      onChange={(value) => store.onChange(value)}
      onSelect={console.log}
    />
    <div>disabled</div>
    <MoreSelect<number>
      disabled
      data={store.data}
      value={store.value}
      onChange={(value) => store.onChange(value)}
    />
    <div>disabledClose</div>
    <MoreSelect<number>
      disabledClose
      data={store.data}
      value={store.value}
      onChange={(value) => store.onChange(value)}
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

export const ComMoreSelectWithMultipleByValue = () => (
  <div>
    <div>不传selected和onSelect，改为value和onChange</div>
    <MoreSelect<number>
      multiple
      data={store.data}
      value={store.value}
      onChange={(value) => store.onChange(value)}
      onSelect={console.log}
    />
  </div>
)

export const ComMoreSelectClick = () => (
  <>
    <MoreSelect<number>
      isGroupList
      multiple
      data={store.dataGroup.slice()}
      onClick={store.clickFn}
      selected={store.selected}
      onSelect={(selected) => {
        store.setSelected(selected)
      }}
    />
    <div>{_.map(store.selected, (item) => item.text).join('')}</div>
  </>
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

export const ComMoreSelectWithMaxTagCount = () => {
  // 创建一个包含多个选项的数据集
  const manyOptions = [
    { value: 1, text: '选项1' },
    { value: 2, text: '选项2' },
    { value: 3, text: '选项3' },
    { value: 4, text: '选项4' },
    { value: 5, text: '选项5' },
    { value: 6, text: '选项6' },
    { value: 7, text: '选项7' },
    { value: 8, text: '选项8' },
  ]

  // 预选多个选项
  const preSelected = manyOptions.slice(0, 6)

  return (
    <div style={{ width: '300px' }}>
      <h3>maxTagCount 示例</h3>

      <div style={{ marginBottom: '20px' }}>
        <h4>不使用 maxTagCount（显示所有选项）</h4>
        <MoreSelect<number>
          multiple
          data={manyOptions}
          selected={preSelected}
          onSelect={(selected) => {
            console.log('不限制显示数量:', selected)
          }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4>maxTagCount={2}（最多显示2个选项）</h4>
        <MoreSelect<number>
          multiple
          maxTagCount={2}
          data={manyOptions}
          selected={preSelected}
          onSelect={(selected) => {
            console.log('最多显示2个:', selected)
          }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4>maxTagCount={3}（最多显示3个选项）</h4>
        <MoreSelect<number>
          multiple
          maxTagCount={3}
          data={manyOptions}
          selected={preSelected}
          onSelect={(selected) => {
            console.log('最多显示3个:', selected)
          }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4>maxTagCount=responsive（响应式模式）</h4>
        <MoreSelect<number>
          multiple
          maxTagCount='responsive'
          data={manyOptions}
          selected={preSelected}
          onSelect={(selected) => {
            console.log('响应式模式:', selected)
          }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4>自定义 maxTagPlaceholder</h4>
        <MoreSelect<number>
          multiple
          maxTagCount={2}
          maxTagPlaceholder={(omittedValues, omittedCount) => (
            <span style={{ color: '#1890ff', fontWeight: 'bold' }}>
              还有{omittedCount}项未显示
            </span>
          )}
          data={manyOptions}
          selected={preSelected}
          onSelect={(selected) => {
            console.log('自定义占位符:', selected)
          }}
        />
      </div>
    </div>
  )
}

export default {
  title: '表单/MoreSelect',
}
