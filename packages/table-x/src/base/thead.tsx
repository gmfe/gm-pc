import React, { FC } from 'react'
import Th from './th'
import { TableXTheadProps } from './types'

const Thead: FC<TableXTheadProps> = ({ headerGroups, totalWidth }) => {
  return (
    <thead className='gm-table-x-thead'>
      {headerGroups.map((headerGroup, groupIndex) => (
        <tr key={groupIndex} className='gm-table-x-tr'>
          {headerGroup.headers.map((header, headerIndex) => (
            <Th column={header} key={headerIndex} totalWidth={totalWidth} />
          ))}
        </tr>
      ))}
    </thead>
  )
}

export default React.memo(Thead)
