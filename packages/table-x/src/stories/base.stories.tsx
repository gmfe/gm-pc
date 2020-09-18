import React, { useRef } from 'react'
import { TableX, TableXVirtualized } from '../base'
import { columns, groupColumns, sortColumns, store } from './data'
import { TABLE_X } from '../utils'
import { VariableSizeList } from 'react-window'

export const ComTableX = () => (
  <div>
    <TableX columns={columns} data={store.data} />
    <TableX columns={columns} data={store.data} loading />
    <TableX columns={columns} data={[]} />
    <TableX columns={columns} data={[]} tiled className='gm-margin-10' />
  </div>
)

export const ComTableXTd = () => {
  return (
    <TableX
      columns={[
        {
          Header: '成熟',
          accessor: 'city',
        },
        {
          Header: '区域',
          id: 'area',
          Cell: (cellprops) => {
            return (
              <div>
                {cellprops.row.original.area.map((v: any) => (
                  <div key={v}>{v}</div>
                ))}
              </div>
            )
          },
        },
      ]}
      data={[
        {
          city: '深圳',
          area: ['南山', '福田', '宝安'],
        },
      ]}
    />
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
            ref.current!.scrollToItem(9, 'start')
          }}
        >
          滚到第 10 行
        </button>
      </div>
      <TableXVirtualized
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
  <TableX columns={columns} data={store.data} style={{ height: '200px' }} />
)

export const ComTableForIsTrDisabledIsTrHighlight = () => (
  <TableX
    columns={columns}
    data={store.data}
    isTrHighlight={(_, index) => index === 0}
    isTrDisable={(_, index) => index % 2 === 0}
  />
)

export default {
  title: 'TableX/TableX',
}
