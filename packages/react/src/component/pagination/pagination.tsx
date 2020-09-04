import React, { FC } from 'react'
import Left from './left'
import Right from './right'
import PageWithCount from './page_with_count'
import PageWithoutCount from './page_without_count'
import { InnerPaging, PaginationProps } from './types'
import { Flex } from '../flex'
import _ from 'lodash'

const Pagination: FC<PaginationProps> = ({ paging, onChange }) => {
  const p: InnerPaging = _.merge(
    {
      offset: 0,
      limit: 10,
      need_count: false,
      has_more: false,
    },
    paging
  )

  return (
    <Flex wrap className='gm-pagination'>
      <Left paging={p} onChange={onChange} />
      {paging.need_count ? (
        <PageWithCount paging={p} onChange={onChange} />
      ) : (
        <PageWithoutCount paging={p} onChange={onChange} />
      )}
      {paging.need_count && <Right paging={p} onChange={onChange} />}
    </Flex>
  )
}

export default Pagination
