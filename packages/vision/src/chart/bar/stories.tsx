import React from 'react'
import { Bar as BarChart } from '../../index'

export const BarBasic = () => (
  <div>
    <h1>Basic</h1>
    <BarChart
      data={[
        { name: '美式', count: 1.0 },
        { name: '卡布奇诺', count: 0.8 },
        { name: '拿铁', count: 1.2 },
        { name: '绿茶', count: 2.3 },
        { name: '玛奇朵', count: 1.1 },
        { name: '红茶', count: 1.5 },
      ]}
      options={{
        height: 300,
        position: 'name*count',
      }}
    />
    <h1>Transpose</h1>
    <BarChart
      data={[
        { name: '美式', count: 1.0 },
        { name: '卡布奇诺', count: 0.8 },
        { name: '拿铁', count: 1.2 },
        { name: '绿茶', count: 2.3 },
        { name: '玛奇朵', count: 1.1 },
        { name: '红茶', count: 1.5 },
      ]}
      options={{
        height: 300,
        position: 'name*count',
        coordinate: {
          actions: 'transpose',
        },
      }}
    />
    <h1>深蓝主题</h1>
    <BarChart
      data={[
        { name: '美式', count: 1.0 },
        { name: '卡布奇诺', count: 0.8 },
        { name: '拿铁', count: 1.2 },
        { name: '绿茶', count: 2.3 },
        { name: '玛奇朵', count: 1.1 },
        { name: '红茶', count: 1.5 },
      ]}
      options={{
        height: 300,
        position: 'name*count',
        theme: 'ocean',
      }}
    />
    <BarChart
      data={[
        { name: '美式', count: 1.0 },
        { name: '卡布奇诺', count: 0.8 },
        { name: '拿铁', count: 1.2 },
        { name: '绿茶', count: 2.3 },
        { name: '玛奇朵', count: 1.1 },
        { name: '红茶', count: 1.5 },
      ]}
      options={{
        height: 300,
        position: 'name*count',
        theme: 'ocean',
        coordinate: {
          actions: 'transpose',
        },
      }}
    />
  </div>
)

export const BarStack = () => (
  <div>
    <h1>Basic</h1>
    <BarChart
      data={[
        { year: '2014', type: 'Sales', sales: 1000 },
        { year: '2015', type: 'Sales', sales: 1170 },
        { year: '2016', type: 'Sales', sales: 660 },
        { year: '2017', type: 'Sales', sales: 1030 },
        { year: '2014', type: 'Expenses', sales: 400 },
        { year: '2015', type: 'Expenses', sales: 460 },
        { year: '2016', type: 'Expenses', sales: 1120 },
        { year: '2017', type: 'Expenses', sales: 540 },
        { year: '2014', type: 'Profit', sales: 300 },
        { year: '2015', type: 'Profit', sales: 300 },
        { year: '2016', type: 'Profit', sales: 300 },
        { year: '2017', type: 'Profit', sales: 350 },
      ]}
      options={{
        height: 300,
        position: 'year*sales',
        color: 'type',
        adjust: 'stack',
      }}
    />
    <h1>Transpose</h1>
    <BarChart
      data={[
        { year: '2014', type: 'Sales', sales: 1000 },
        { year: '2015', type: 'Sales', sales: 1170 },
        { year: '2016', type: 'Sales', sales: 660 },
        { year: '2017', type: 'Sales', sales: 1030 },
        { year: '2014', type: 'Expenses', sales: 400 },
        { year: '2015', type: 'Expenses', sales: 460 },
        { year: '2016', type: 'Expenses', sales: 1120 },
        { year: '2017', type: 'Expenses', sales: 540 },
        { year: '2014', type: 'Profit', sales: 300 },
        { year: '2015', type: 'Profit', sales: 300 },
        { year: '2016', type: 'Profit', sales: 300 },
        { year: '2017', type: 'Profit', sales: 350 },
      ]}
      options={{
        height: 300,
        position: 'year*sales',
        color: 'type',
        adjust: 'stack',
        coordinate: {
          actions: 'transpose',
        },
      }}
    />
    <h1>深蓝主题</h1>
    <BarChart
      data={[
        { year: '2014', type: 'Sales', sales: 1000 },
        { year: '2015', type: 'Sales', sales: 1170 },
        { year: '2016', type: 'Sales', sales: 660 },
        { year: '2017', type: 'Sales', sales: 1030 },
        { year: '2014', type: 'Expenses', sales: 400 },
        { year: '2015', type: 'Expenses', sales: 460 },
        { year: '2016', type: 'Expenses', sales: 1120 },
        { year: '2017', type: 'Expenses', sales: 540 },
        { year: '2014', type: 'Profit', sales: 300 },
        { year: '2015', type: 'Profit', sales: 300 },
        { year: '2016', type: 'Profit', sales: 300 },
        { year: '2017', type: 'Profit', sales: 350 },
      ]}
      options={{
        height: 300,
        position: 'year*sales',
        theme: 'ocean',
        color: 'type',
        adjust: 'stack',
        coordinate: {
          actions: 'transpose',
        },
      }}
    />
  </div>
)

export const BarDodge = () => (
  <div>
    <h1>Basic</h1>
    <BarChart
      data={[
        { year: '2014', type: 'Sales', sales: 1000 },
        { year: '2015', type: 'Sales', sales: 1170 },
        { year: '2016', type: 'Sales', sales: 660 },
        { year: '2017', type: 'Sales', sales: 1030 },
        { year: '2014', type: 'Expenses', sales: 400 },
        { year: '2015', type: 'Expenses', sales: 460 },
        { year: '2016', type: 'Expenses', sales: 1120 },
        { year: '2017', type: 'Expenses', sales: 540 },
        { year: '2014', type: 'Profit', sales: 300 },
        { year: '2015', type: 'Profit', sales: 300 },
        { year: '2016', type: 'Profit', sales: 300 },
        { year: '2017', type: 'Profit', sales: 350 },
      ]}
      options={{
        height: 300,
        position: 'year*sales',
        color: 'type',
        adjust: 'dodge',
      }}
    />
    <h2>Transpose</h2>
    <BarChart
      data={[
        { year: '2014', type: 'Sales', sales: 1000 },
        { year: '2015', type: 'Sales', sales: 1170 },
        { year: '2016', type: 'Sales', sales: 660 },
        { year: '2017', type: 'Sales', sales: 1030 },
        { year: '2014', type: 'Expenses', sales: 400 },
        { year: '2015', type: 'Expenses', sales: 460 },
        { year: '2016', type: 'Expenses', sales: 1120 },
        { year: '2017', type: 'Expenses', sales: 540 },
        { year: '2014', type: 'Profit', sales: 300 },
        { year: '2015', type: 'Profit', sales: 300 },
        { year: '2016', type: 'Profit', sales: 300 },
        { year: '2017', type: 'Profit', sales: 350 },
      ]}
      options={{
        height: 300,
        position: 'year*sales',
        color: 'type',
        adjust: 'dodge',
        coordinate: {
          actions: 'transpose',
        },
      }}
    />
    <h2>深蓝主题</h2>
    <BarChart
      data={[
        { year: '2014', type: 'Sales', sales: 1000 },
        { year: '2015', type: 'Sales', sales: 1170 },
        { year: '2016', type: 'Sales', sales: 660 },
        { year: '2017', type: 'Sales', sales: 1030 },
        { year: '2014', type: 'Expenses', sales: 400 },
        { year: '2015', type: 'Expenses', sales: 460 },
        { year: '2016', type: 'Expenses', sales: 1120 },
        { year: '2017', type: 'Expenses', sales: 540 },
        { year: '2014', type: 'Profit', sales: 300 },
        { year: '2015', type: 'Profit', sales: 300 },
        { year: '2016', type: 'Profit', sales: 300 },
        { year: '2017', type: 'Profit', sales: 350 },
      ]}
      options={{
        height: 300,
        position: 'year*sales',
        color: 'type',
        theme: 'ocean',
        adjust: 'dodge',
        coordinate: {
          actions: 'transpose',
        },
      }}
    />
  </div>
)

export const BarRank = () => (
  <div>
    <h1>Basic</h1>
    <BarChart
      data={[
        { type: '金融保险', value: 1234 },
        { type: '医疗卫生', value: 868 },
        { type: '社会公共管理', value: 672 },
        { type: 'IT 通讯电子', value: 491 },
        { type: '教育', value: 367 },
        { type: '建筑房地产', value: 251 },
        { type: '交通运输与仓储邮政', value: 142 },
        { type: '住宿旅游', value: 103 },
        { type: '建材家居', value: 85 },
        { type: '汽车', value: 34 },
      ]}
      options={{
        height: 300,
        position: 'type*value',
        adjust: 'rank',
      }}
    />
    <h1>深蓝主题</h1>
    <BarChart
      data={[
        { type: '金融保险', value: 1234 },
        { type: '医疗卫生', value: 868 },
        { type: '社会公共管理', value: 672 },
        { type: 'IT 通讯电子', value: 491 },
        { type: '教育', value: 367 },
        { type: '建筑房地产', value: 251 },
        { type: '交通运输与仓储邮政', value: 142 },
        { type: '住宿旅游', value: 103 },
        { type: '建材家居', value: 85 },
        { type: '汽车', value: 34 },
      ]}
      options={{
        height: 300,
        position: 'type*value',
        theme: 'ocean',
        adjust: 'rank',
      }}
    />
  </div>
)

export const BarTable = () => (
  <div>
    <BarChart
      data={[
        { type: '汽车', value: 34 },
        { type: '建材家居', value: 85 },
        { type: '住宿旅游', value: 103 },
        { type: '交通运输与仓储邮政', value: 142 },
        { type: '建筑房地产', value: 251 },
        { type: '教育', value: 367 },
        { type: 'IT 通讯电子', value: 491 },
        { type: '社会公共管理', value: 672 },
        { type: '医疗卫生', value: 868 },
        { type: '金融保险', value: 1234 },
      ]}
      options={{
        height: 300,
        position: 'type*value',
        adjust: 'table',
      }}
    />
    <h1>深蓝主题</h1>
    <BarChart
      data={[
        { type: '汽车', value: 34 },
        { type: '建材家居', value: 85 },
        { type: '住宿旅游', value: 103 },
        { type: '交通运输与仓储邮政', value: 142 },
        { type: '建筑房地产', value: 251 },
        { type: '教育', value: 367 },
        { type: 'IT 通讯电子', value: 491 },
        { type: '社会公共管理', value: 672 },
        { type: '医疗卫生', value: 868 },
        { type: '金融保险', value: 1234 },
      ]}
      options={{
        height: 300,
        position: 'type*value',
        theme: 'ocean',
        adjust: 'table',
      }}
    />
    <h1>橙色主题</h1>
    <BarChart
      data={[
        { type: '汽车', value: 34 },
        { type: '建材家居', value: 85 },
        { type: '住宿旅游', value: 103 },
        { type: '交通运输与仓储邮政', value: 142 },
        { type: '建筑房地产', value: 251 },
        { type: '教育', value: 367 },
        { type: 'IT 通讯电子', value: 491 },
        { type: '社会公共管理', value: 672 },
        { type: '医疗卫生', value: 868 },
        { type: '金融保险', value: 1234 },
      ]}
      options={{
        height: 300,
        position: 'type*value',
        theme: 'sunset',
        adjust: 'table',
      }}
    />
  </div>
)

export const BarFacet = () => (
  <div>
    <h1>Basic</h1>
    <h3>&nbsp;&nbsp;关于居中：通过padding设置居中，antv没提供自动居中</h3>
    <BarChart
      data={[
        { name: '供应商A', value: 34, type: '采购频次' },
        { name: '供应商测试长度长度长度B', value: 85, type: '采购频次' },

        { name: '供应商C', value: 103, type: '采购频次' },

        { name: '供应商D', value: 142, type: '采购频次' },

        { name: '供应商E', value: 251, type: '采购频次' },
        { name: '供应商A', value: 24, type: '履约率' },
        { name: '供应商测试长度长度长度B', value: 35, type: '履约率' },
        { name: '供应商C', value: 73, type: '履约率' },
        { name: '供应商D', value: 52, type: '履约率' },
        { name: '供应商E', value: 151, type: '履约率' },
      ]}
      options={{
        height: 300,
        position: 'name*value*type',
        adjust: 'facet',
        padding: [0, 0, 0, 100],
        scale: {
          value: {
            formatter(v: number) {
              return v + '%'
            },
          },
        },
      }}
    />
    <h1>深蓝主题</h1>
    <BarChart
      data={[
        { name: '供应商A', value: 34, type: '采购频次' },
        { name: '供应商测试长度长度长度B', value: 85, type: '采购频次' },

        { name: '供应商C', value: 103, type: '采购频次' },

        { name: '供应商D', value: 142, type: '采购频次' },

        { name: '供应商E', value: 251, type: '采购频次' },
        { name: '供应商A', value: 24, type: '履约率' },
        { name: '供应商测试长度长度长度B', value: 35, type: '履约率' },
        { name: '供应商C', value: 73, type: '履约率' },
        { name: '供应商D', value: 52, type: '履约率' },
        { name: '供应商E', value: 151, type: '履约率' },
      ]}
      options={{
        height: 300,
        position: 'name*value*type',
        adjust: 'facet',
        theme: 'ocean',
        scale: {
          value: {
            formatter(v: number) {
              return v + '%'
            },
          },
        },
      }}
    />
  </div>
)

export default {
  title: 'Chart/柱状图 Bar',
}
