import React, { MouseEvent } from 'react'
import { DiyTableXColumn } from '../types'
import SVGRemove from '../../../svg/remove.svg'
import SVGDragable from '../../../svg/dragable.svg'
import { Sortable, SortableBase, SortableDataItem } from '../../../../../sortable/src'
import { getSortedColumns } from '../utils'
interface ListProps {
  columns: DiyTableXColumn[]
  onColumnsRemove(key: string): void
  onSort(columns: DiyTableXColumn[]): void
  sortable?: boolean
}

function List({ columns, onColumnsRemove, onSort, sortable }: ListProps) {
  // 拖拽排序支持，不改变原顺序，使用sequence字段标识顺序
  const sortedColumns = getSortedColumns(columns)
  const onChange = (data: SortableDataItem[]): void => {
    const sortedColumns = data.map((item, index) => {
      const column = columns.find((column) => column.key === item.value)!
      return { ...column, sequence: index }
    })
    onSort(sortedColumns)
  }

  const onRemove = (event: MouseEvent<SVGElement>, key: string): void => {
    event.stopPropagation()
    onColumnsRemove(key)
  }

  return (
    <ul className='gm-react-table-x-diy-modal-list-ul'>
      <Sortable
        data={sortedColumns.map((column, index) => {
          return {
            text: column.diyItemText || (column.Header as any) || '-',
            value: column.key,
          }
        })}
        onChange={(data) => onChange(data)}
        options={{
          direction: 'horizontal',
          handle: '.tw-cursor-move',
          chosenClass: 'tw-bg-blue-300',
        }}
        disabled={!sortable}
        renderItem={(item, index) => {
          const { diyItemText, Header, key, diyEnable } = sortedColumns[index]
          const text = diyItemText ?? Header
          return (
            <li
              className='gm-react-table-x-diy-modal-list-li tw-cursor-default'
              key={index}
            >
              {sortable ? (
                <SVGDragable className='tw-cursor-move tw-mr-1' />
              ) : (
                <span className='tw-text-gray-300 tw-mr-1'>•</span>
              )}
              {text}
              {diyEnable && (
                <SVGRemove
                  className='gm-cursor gm-react-table-x-diy-modal-list-li-remove'
                  onClick={(event) => onRemove(event, key!)}
                />
              )}
            </li>
          )
        }}
      />
    </ul>
  )
}

export default List
