import React from 'react'
import { columns, store } from './data'
import { TableX } from '../base'
import {
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
              <OperationCellRowEdit isEditing={false}>
                <OperationDelete
                  onClick={() => {
                    console.log('delete')
                  }}
                  read
                />
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
