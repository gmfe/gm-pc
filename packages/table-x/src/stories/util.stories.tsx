import React from 'react'
import { columns, store } from './data'
import { TableX } from '../base'
import { OperationHeader, OperationDelete } from '../components/operation'

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
              <div>
                <OperationDelete
                  onClick={() => {
                    console.log('delete')
                  }}
                  read
                />
              </div>
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
