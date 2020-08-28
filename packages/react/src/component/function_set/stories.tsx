import React from 'react'
import FunctionSet from './function_set'

const data = [
  {
    text: '功能1',
    onClick: () => {
      window.alert('功能1')
    },
  },
  {
    text: '功能2',
    onClick: () => {
      window.alert('功能2')
    },
  },
  {
    text: '功能3(不可用)',
    disabled: true,
    onClick: () => {
      window.alert('功能3')
    },
  },
  {
    text: '功能4(不会示)',
    show: false,
    onClick: () => {
      window.alert('功能4')
    },
  },
  {
    text: '新建',
    children: [
      {
        text: '商品新建',
        children: [
          {
            text: '商品新建1',
            onClick: () => {
              window.alert('商品新建1')
            },
          },
          {
            text: '商品新建2',
            onClick: () => {
              window.alert('商品新建2')
            },
          },
        ],
      },
    ],
  },
]

export const ComFunctionSet = () => (
  <div style={{ padding: '50px' }}>
    <FunctionSet data={data} />
    <div>disabled</div>
    <FunctionSet data={data} disabled />
    <div>children</div>
    <FunctionSet data={data}>自定义 children</FunctionSet>
    <div>right</div>
    <FunctionSet data={data} right />
    <div>data [] 不显示</div>
    <FunctionSet data={[]} />
  </div>
)

export default {
  title: '表单/FunctionSet',
}
