import React from 'react'
import { columns, store } from './data'
import { TableX } from '../base'
import {
  OperationCell,
  OperationIcon,
  OperationDetail,
  OperationHeader,
  OperationDelete,
  OperationCellRowEdit,
} from '../components/operation'

export const ComOperation = () => (
  <div>
    <TableX
      columns={[
        ...columns,
        {
          Header: <OperationHeader />,
          id: 'operation',
          width: 110,
          Cell: () => {
            return (
              <OperationCell>
                <OperationDetail
                  onClick={() => {
                    console.log('delete')
                  }}
                />
                <OperationDetail
                  href='https://www.guanmai.cn'
                  onClick={() => {
                    console.log('delete')
                  }}
                />
                <OperationDelete
                  onClick={() => {
                    console.log('delete')
                  }}
                  read
                />
                <OperationIcon
                  tip='提示'
                  onClick={() => {
                    console.log('lalala')
                  }}
                >
                  icon
                </OperationIcon>
              </OperationCell>
            )
          },
        },
      ]}
      data={store.data}
    />
  </div>
)

export const ComOperationCellRowEdit = () => (
  <div>
    <TableX
      columns={[
        ...columns,
        {
          Header: <OperationHeader />,
          id: 'operation',
          width: 110,
          Cell: () => {
            return (
              <OperationCellRowEdit isEditing={false}>
                <span>其他</span>
              </OperationCellRowEdit>
            )
          },
        },
      ]}
      data={store.data}
    />
  </div>
)

export default {
  title: 'TableX/TableXUtil',
}
