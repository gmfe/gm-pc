import React, { FC } from 'react'
import _ from 'lodash'
import classNames from 'classnames'

import SearchSelect from './search_select'
import { getColumnKey } from './util'
import Flex from '../flex/flex'
import { SearchTableSelectProps } from './types'
import { ListBaseDataItem, ListBaseGroupDataItem } from '../list/types'

const SearchTableSelect: FC<SearchTableSelectProps> = ({
  data,
  onSearch,
  columns,
  keyField,
  ...rest
}) => {
  const Title = (
    <Flex alignCenter className='gm-search-table-select-list-head'>
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

  let newData: ListBaseGroupDataItem[] = []
  if (data.length !== 0) {
    newData = [
      {
        label: Title,
        children: data as ListBaseDataItem[],
      },
    ]
  }

  const renderItem = (item: ListBaseDataItem, index: number) => {
    return (
      <Flex alignCenter className='gm-search-table-select-list-item'>
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
    <SearchSelect
      keyField={keyField}
      data={newData}
      onSearch={onSearch}
      renderItem={renderItem}
      {...rest}
    />
  )
}

export default SearchTableSelect
