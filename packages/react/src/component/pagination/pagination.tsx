import React, { FC } from 'react'
import Left from './left'
import Right from './right'
import PageWithCount from './page_with_count'
import PageWithoutCount from './page_without_count'
import { InnerPaging, PaginationProps } from './types'
import { Flex } from '../flex'

const Pagination: FC<PaginationProps> = ({ paging, onChange }) => {
  const p: InnerPaging = {
    ...paging,
    offset: paging.offset || 0,
    limit: paging.limit || 10,
  }

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
