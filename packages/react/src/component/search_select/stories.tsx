import React from 'react'
import _ from 'lodash'
import { observable, toJS } from 'mobx'
import { storiesOf } from '@storybook/react'
import { observer } from 'mobx-react'
import SearchSelect from './search_select'
import SearchTableSelect from './search_table_select'
import { Button } from '../button'

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
  filterData: [],
  filterTableData: [],
  tableData: [
    {
      purchase_price_limit: null,
      std_unit_name: '斤',
      sale_ratio: 3,
      category_id_1: 'A3978',
      settle_supplier_name: '水果供应商',
      spu_id: 'C874502',
      sku_id: 'D13944575',
      sale_unit_name: '包',
      category_id_2: 'B19074',
      category_id_2_name: '甘蓝类',
      settle_supplier_id: 'T13251',
      sku_name: '大白菜',
      station_id: 'T7936',
      category_id_1_name: '蔬菜',
      max_stock_unit_price: null,
    },
    {
      purchase_price_limit: null,
      std_unit_name: '斤',
      sale_ratio: 1,
      category_id_1: 'A3978',
      settle_supplier_name: '水果供应商',
      spu_id: 'C874502',
      sku_id: 'D3628124',
      sale_unit_name: '斤',
      category_id_2: 'B19074',
      category_id_2_name: '甘蓝类',
      settle_supplier_id: 'T13251',
      sku_name: '小白菜',
      station_id: 'T7936',
      category_id_1_name: '蔬菜',
      max_stock_unit_price: null,
    },
  ],
  tableColumn: [
    {
      Header: 'id',
      accessor: 'sku_id',
      width: 100,
    },
    {
      Header: '名字',
      accessor: 'sku_name',
      width: 100,
    },
    {
      Header: '供应商',
      accessor: 'settle_supplier_name',
      width: 100,
    },
    {
      Header: '加粗',
      accessor: 'sku_name',
      width: 100,
      Cell: (cellProps: any) => {
        return (
          <div>
            <Button>+1</Button>
          </div>
        )
      },
    },
  ],
  setFilterData(data) {
    this.filterData = data
  },
  setFilterTableData(data) {
    this.filterTableData = data
  },
})

const NormalSearchSelect = observer(() => {
  const renderItem = (item) => {
    return (
      <div>
        <span>位置:{item.text}😅</span>|<span>编号:{item.value}🤣</span>
      </div>
    )
  }

  return (
    <div>
      <h3>搜索</h3>
      <SearchSelect data={toJS(store.data)} />
      <h3>自定义列</h3>
      <SearchSelect data={toJS(store.data)} renderItem={renderItem} />
      <h3>自定义filter</h3>
      <SearchSelect
        data={toJS(store.data)}
        renderItem={renderItem}
        withFilter={(groupData, query) => {
          const result = [] as GroupDataItem[]
          groupData.forEach((item) => {
            const list = item.children.filter((child) => child.value === +query)
            if (list.length) {
              result.push({ ...item, children: list })
            }
          })
          return result
        }}
        placeholder='根据编号进行搜索'
      />
    </div>
  )
})

const ServerSearchSelect = observer(() => {
  const _handleSearch = (params: { query: any }): Promise<any> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (params.query) {
          const data = store.data.filter((d) => d.text.includes(params.query))
          store.setFilterData(data)
          resolve()
        } else {
          store.setFilterData([])
          resolve()
        }
      }, 1000)
    })
  }

  const renderItem = (item) => {
    return (
      <div>
        <span>位置:{item.text}😅</span>|<span>编号:{item.value}🤣</span>
      </div>
    )
  }

  return (
    <div>
      <h3>服务端搜索</h3>
      <SearchSelect data={toJS(store.filterData)} onSearch={_handleSearch} />
      <h3>自定义列</h3>
      <SearchSelect
        data={toJS(store.filterData)}
        onSearch={_handleSearch}
        renderItem={renderItem}
      />
    </div>
  )
})

const TabelSelect = observer(() => {
  const _handleSearch = ({ query }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (query) {
          const data = store.tableData.filter((d) => {
            return d.sku_id.includes(query)
          })
          store.setFilterTableData(data)
          resolve()
        } else {
          store.setFilterTableData([])
          resolve()
        }
      }, 1000)
    })
  }
  return (
    <div>
      <h1>SearchTableSelect 组件</h1>
      <h3>搜索</h3>
      <SearchTableSelect
        keyField='sku_id'
        data={toJS(store.tableData)}
        columns={store.tableColumn}
        placeholder='根据sku_id搜索'
      />
      <h3>服务器搜索</h3>
      <SearchTableSelect
        data={toJS(store.filterTableData)}
        onSearch={_handleSearch}
        columns={store.tableColumn}
        placeholder='请求服务器数据(根据sku_id搜索)'
      />
    </div>
  )
})

storiesOf('表单/SearchSelect', module).add('搜索', () => <NormalSearchSelect />)
storiesOf('表单/SearchSelect', module).add('服务端搜索', () => <ServerSearchSelect />)
storiesOf('表单/SearchSelect', module).add('表格', () => <TabelSelect />)
// storiesOf('表单/SearchSelect', module).add('自定义渲染', () => <RenderItemSearchSelect />)
// storiesOf('表单/SearchSelect', module).add('表格形式', () => <TableSearchSelect />)
