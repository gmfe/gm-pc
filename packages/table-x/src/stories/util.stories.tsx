import React from 'react'
import { columns, store } from './data'
import { TableX } from '../base'
import { OperationHeader, OperationDelete, OperationCell } from '../components/operation'

export const ComOperation = () => (
  <div>
    <TableX
      columns={[
        ...columns,
        {
          Header: <OperationHeader />,
          id: 'operation',
          Cell: () => {
            return (
              <OperationCell>
                <OperationDelete
                  onClick={() => {
                    console.log('delete')
                  }}
                  read
                />
              </OperationCell>
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
