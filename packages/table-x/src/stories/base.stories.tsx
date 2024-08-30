import React, { useRef, useState } from 'react'
import { TableX, TableXCellFull, TableXCellFullItem, TableInstance } from '../base'
import { columns, groupColumns, sortColumns, store } from './data'
import { TABLE_X } from '../utils'
import { VariableSizeList } from 'react-window'
import { Table } from '../table'

export const ComTableX = () => {
  const [selected, setSelected] = useState<number[]>([])
  const tableRef = useRef<TableInstance>(null)
  return (
    <div>
      <button onClick={() => tableRef.current?.scrollToItem(9)}>滚到第 10 行</button>
      <Table
        tableRef={tableRef}
        columns={[
          {
            Header: '序号',
            id: 'index',
            Cell: (cellProps: any) => cellProps.row.index + 1,
            width: 100,
            headerSort: true,
            defaultSortDirection: 'asc',
          },
          { Header: '建单时间', show: false, accessor: 'submitTime', minWidth: 200 },
          { Header: '地址', accessor: 'address.text' as any, width: 200, maxWidth: 200 },
          {
            Header: '供应商信息',
            width: 500,
            minWidth: 500,
            accessor: 'supplierName',
            id: 'supplierName',
          },
          {
            Header: '入库金额',
            accessor: 'totalMoney',
            id: 'totalMoney',
            minWidth: 100,
            headerSort: true,
            Cell: ({ value, row, index, original }) => {
              // return row.original.totalMoney
              return value
            },
          },
        ]}
        data={store.virtualData}
        isHighlight
        isSelect
        isVirtualized
        virtualizedHeight={200}
        keyField='id'
        selected={selected}
        onSelect={(selected) => {
          setSelected(selected)
        }}
        onRowClick={(original, e) => {
          if (e instanceof KeyboardEvent) {
            const key = original.id
            setSelected((selected) => {
              const temp = [...selected]
              if (selected.includes(key)) {
                temp.splice(temp.indexOf(key), 1)
              } else {
                temp.push(key)
              }
              return temp
            })
          }
        }}
      />
      <Table columns={columns} data={store.data} loading />
      <Table columns={columns} data={[]} />
      <Table columns={columns} data={[]} tiled className='gm-margin-10' />
    </div>
  )
}

export const ComTableXTd = () => {
  return (
    <div className='gm-padding-10'>
      <Table
        columns={[
          {
            Header: '区域',
            id: 'area0',
            Cell: (cellProps: any) => {
              return (
                <TableXCellFull>
                  {cellProps.row.original.area.map((v: any, i: number) => (
                    <TableXCellFullItem key={i}>{v}</TableXCellFullItem>
                  ))}
                </TableXCellFull>
              )
            },
          },
          {
            Header: '区域',
            id: 'area1',
            Cell: (cellProps: any) => {
              return (
                <TableXCellFull>
                  {cellProps.row.original.area.map((v: any, i: number) => (
                    <TableXCellFullItem key={i}>{v}</TableXCellFullItem>
                  ))}
                </TableXCellFull>
              )
            },
          },
          {
            Header: '区域',
            id: 'area2',
            Cell: (cellProps: any) => {
              return (
                <TableXCellFull>
                  {cellProps.row.original.area.map((v: any, i: number) => (
                    <TableXCellFullItem key={i}>{v}</TableXCellFullItem>
                  ))}
                </TableXCellFull>
              )
            },
          },
        ]}
        data={[
          {
            city: '深圳',
            area: ['南山', '福田', '宝安'],
          },
          {
            city: '广州',
            area: ['番禺', '白云', '黄埔'],
          },
        ]}
        border
      />
    </div>
  )
}

export const ComTableXVirtualized = () => {
  const ref = useRef<VariableSizeList>(null)
  const height =
    TABLE_X.HEIGHT_HEAD_TR + Math.min(10, store.virtualData.length) * TABLE_X.HEIGHT_TR

  return (
    <div>
      <div>
        <button
          onClick={() => {
            console.log(ref.current)
            ref.current!.scrollToItem(9, 'start')
          }}
        >
          滚到第 10 行
        </button>
      </div>
      <Table
        isHighlight
        isVirtualized
        virtualizedHeight={height}
        virtualizedItemSize={TABLE_X.HEIGHT_TR}
        refVirtualized={ref}
        columns={columns}
        data={store.virtualData}
      />
    </div>
  )
}

export const ComTableXForGroup = () => (
  <div>
    <div>group 形式只提供简单用，和其他配合用暂不支持</div>
    <TableX columns={groupColumns} data={store.data} />
  </div>
)

export const ComTableXForSort = () => <TableX columns={sortColumns} data={store.data} />

export const ComTableXForLimitHeight = () => (
  <Table columns={columns} data={store.data} style={{ height: '200px' }} />
)

export const ComTableForIsTrDisabledIsTrHighlight = () => (
  <Table
    columns={columns}
    data={store.data}
    isTrHighlight={(_, index) => index === 0}
    isTrDisable={(_, index) => index % 2 === 0}
  />
)

export default {
  title: 'TableX/TableX',
}
