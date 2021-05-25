import React, { FC, memo } from 'react'
import Th from './th'
import { TableXTheadProps } from './types'
import SortHeader, { SortHeaderProps } from '../components/sort_header'

const Thead: FC<TableXTheadProps> = ({
  headerGroups,
  totalWidth,
  onHeaderSort,
  sorts = {},
}) => {
  return (
    <thead className='gm-table-x-thead'>
      {headerGroups.map((headerGroup, groupIndex) => (
        <tr key={groupIndex} className='gm-table-x-tr'>
          {headerGroup.headers.map((header, headerIndex) => {
            if (!header.originHeader) {
              // 如果没有originHeader，则originHeader指向最初的Header
              header.originHeader = header.Header
            }
            if (header.headerSort) {
              const onChange: SortHeaderProps['onChange'] = (direction) => {
                onHeaderSort && onHeaderSort({ field: header.id, direction })
              }
              header.Header = (
                <SortHeader
                  type={sorts[header.id]}
                  onChange={onChange}
                  className='gm-padding-left-0'
                >
                  {header.originHeader}
                </SortHeader>
              )
            } else {
              header.Header = header.originHeader
            }
            return (
              <Th
                //  由于Th加了memo，当header配置了排序增加sortDirection触发Th diff
                sortDirection={sorts[header.id]}
                column={header}
                key={headerIndex}
                totalWidth={totalWidth}
              />
            )
          })}
        </tr>
      ))}
    </thead>
  )
}

export default memo(Thead)
