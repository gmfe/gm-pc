import React from 'react'
import { Pie as PieChart } from './index'

const data = [
  { item: '事例一', count: 40, percent: 0.4 },
  { item: '事例二', count: 21, percent: 0.21 },
  { item: '事例三', count: 107, percent: 0.17 },
  { item: '事例四', count: 13, percent: 0.13 },
  { item: '事例五', count: 9, percent: 0.09 },
]

export const Pie = () => (
  <div>
    <h1>基础</h1>
    <PieChart
      data={data}
      options={{
        height: 300,
        position: 'count',
        color: 'item',
      }}
    />
    <h1>深蓝主题</h1>
    <PieChart
      data={data}
      options={{
        height: 300,
        theme: 'ocean',
        position: 'count',
        color: 'item',
        legend: false,
      }}
    />
  </div>
)

export default {
  title: 'Chart/饼状图 Pie',
}
