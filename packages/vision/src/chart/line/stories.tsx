import React from 'react'
import { Line as LineChart } from '../../index'

const data = [
  {
    percent: 5,
    year: '2009',
    name: '天然气',
  },
  {
    percent: 10,
    year: '2010',
    name: '天然气',
  },
  {
    percent: 12,
    year: '2011',
    name: '天然气',
  },
  {
    percent: 20,
    year: '2012',
    name: '天然气',
  },
  {
    percent: 25,
    year: '2013',
    name: '天然气',
  },
  {
    percent: 40,
    year: '2014',
    name: '天然气',
  },
  {
    percent: 31,
    year: '2015',
    name: '天然气',
  },
  {
    percent: 43,
    year: '2016',
    name: '天然气',
  },
  {
    percent: 55,
    year: '2017',
    name: '天然气',
  },
  {
    percent: 50,
    year: '2018',
    name: '天然气',
  },

  {
    percent: 30,
    year: '2009',
    name: '煤气',
  },
  {
    percent: 31,
    year: '2010',
    name: '煤气',
  },
  {
    percent: 42,
    year: '2011',
    name: '煤气',
  },
  {
    percent: 37,
    year: '2012',
    name: '煤气',
  },
  {
    percent: 36,
    year: '2013',
    name: '煤气',
  },
  {
    percent: 30,
    year: '2014',
    name: '煤气',
  },
  {
    percent: 20,
    year: '2015',
    name: '煤气',
  },
  {
    percent: 15,
    year: '2016',
    name: '煤气',
  },
  {
    percent: 10,
    year: '2017',
    name: '煤气',
  },
  {
    percent: 12,
    year: '2018',
    name: '煤气',
  },

  {
    percent: 10,
    year: '2009',
    name: '太阳能',
  },
  {
    percent: 12,
    year: '2010',
    name: '太阳能',
  },
  {
    percent: 15,
    year: '2011',
    name: '太阳能',
  },
  {
    percent: 20,
    year: '2012',
    name: '太阳能',
  },
  {
    percent: 32,
    year: '2013',
    name: '太阳能',
  },
  {
    percent: 31,
    year: '2014',
    name: '太阳能',
  },
  {
    percent: 35,
    year: '2015',
    name: '太阳能',
  },
  {
    percent: 40,
    year: '2016',
    name: '太阳能',
  },
  {
    percent: 45,
    year: '2017',
    name: '太阳能',
  },
  {
    percent: 47,
    year: '2018',
    name: '太阳能',
  },
]

export const Line = () => (
  <div>
    <h1>Basic</h1>
    <LineChart
      data={data}
      options={{
        width: '100%',
        height: 300,
        position: 'year*percent',
        color: 'name',
        legend: false, // 取消图例
        annotation: {
          text: '预警线',
          // 预警线位置
          value: (data) => {
            return data[8].percent
          },
        },
      }}
    />
    <h1>多个Y轴（数据结构不同）</h1>
    <LineChart
      data={[
        {
          year: '2009',
          tr: 5,
          tyn: 12,
        },
        {
          year: '2010',
          tr: 10,
          tyn: 15,
        },
      ]}
      options={{
        width: '100%',
        height: 300,
        xFieldName: 'year',
        yFieldName: [
          ['tr', '天然气'],
          ['tyn', '太阳能'],
        ],
        scale: {
          value: {
            formatter: (text) => text + 'L',
            min: 0,
            max: 20,
          },
        },
      }}
    />
    <h1>深蓝主题</h1>
    <LineChart
      data={data}
      options={{
        width: '100%',
        height: 300,
        theme: 'ocean',
        position: 'year*percent',
        color: 'name',
        legend: false, // 取消图例
        annotation: {
          text: '预警线',
          // 预警线位置
          value: (data) => {
            return data[8].percent
          },
        },
      }}
    />
  </div>
)

export default {
  title: 'Chart/折线图 Line',
}
