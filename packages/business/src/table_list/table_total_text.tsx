import React, { ComponentType, ReactNode, FC } from 'react'
import { Flex } from '@gm-pc/react'
import _ from 'lodash'

/*
data: [{label: '', content: ''},...]
 */
export interface TotalTextOptions {
  label: string | ComponentType | ReactNode
  content: string | ComponentType | ReactNode
  hide?: boolean
}

const TableTotalText: FC<{ data: TotalTextOptions[] }> = ({ data }) => {
  const list = _.filter(data, (v) => !v.hide)

  return (
    <Flex row wrap>
      {_.map(list, (item, index) => {
        return (
          <Flex alignCenter key={index} wrap>
            {item.label}：
            <span className='gm-text-primary gm-text-14 gm-text-bold'>
              {item.content}
            </span>
            {index < list.length - 1 && (
              <span className='gm-padding-lr-10 gm-text-desc'>|</span>
            )}
          </Flex>
        )
      })}
    </Flex>
  )
}

export default TableTotalText
