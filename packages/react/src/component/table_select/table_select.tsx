import React from 'react'
import { MoreSelect, MoreSelectGroupDataItem } from '../more_select'
import { Flex } from '../flex'
import _ from 'lodash'
import { getColumnKey } from './util'
import classNames from 'classnames'
import { TableSelectProps, TableSelectDataItem } from './types'

/** 和 MoreSelect 类似。多了 columns */
const TableSelect = React.forwardRef<MoreSelect, TableSelectProps>((props, ref) => {
  const { data, columns, className, ...rest } = props

  const Title = (
    <Flex alignCenter className='gm-table-select-list-head'>
      {_.map(columns, (column, i) => (
        <div
          key={`${i}_${getColumnKey(column)}`}
          className={classNames('gm-flex-flex', {
            'gm-flex-none': column.width,
          })}
          style={{
            width: `${column.width}px`,
          }}
        >
          {column.Header}
        </div>
      ))}
    </Flex>
  )

  let newData: MoreSelectGroupDataItem[] = []
  if (data.length !== 0) {
    newData = [
      {
        label: Title,
        children: data,
      },
    ]
  }

  const renderListItem = (item: TableSelectDataItem, index: number) => {
    return (
      <Flex key={item.value} alignCenter className='gm-table-select-list-item'>
        {_.map(columns, (column, i) => {
          let content = null
          if (column.Cell) {
            content = column.Cell({
              original: item,
              index,
            })
          } else if (_.isFunction(column.accessor)) {
            content = column.accessor(item)
          } else if (_.isString(column.accessor)) {
            content = _.get(item, column.accessor)
          }

          if (content === null || content === undefined) {
            content = <div className='gm-text-desc'>-</div>
          }
          return (
            <div
              key={`${i}_${getColumnKey(column)}`}
              className={classNames('gm-flex-flex', {
                'gm-flex-none': column.width,
              })}
              style={{
                width: `${column.width}px`,
              }}
            >
              {content}
            </div>
          )
        })}
      </Flex>
    )
  }

  return (
    <MoreSelect
      ref={ref}
      {...rest}
      isGroupList
      data={newData}
      renderListItem={renderListItem}
      className={classNames('gm-table-select', className)}
      popupClassName='gm-table-select-popup'
    />
  )
})

export default TableSelect
