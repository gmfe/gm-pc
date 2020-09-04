import React, { FC } from 'react'
import Left from './left'
import Right from './right'
import PageWithCount from './page_with_count'
import PageWithoutCount from './page_without_count'
import { PaginationProps } from './types'
import { Flex } from '../flex'

const Pagination: FC<PaginationProps> = ({ paging, onChange }) => {
  return (
    <Flex wrap className='gm-pagination'>
      <Left paging={paging} onChange={onChange} />
      {paging.need_count ? (
        <PageWithCount paging={paging} onChange={onChange} />
      ) : (
        <PageWithoutCount paging={paging} onChange={onChange} />
      )}
      {paging.need_count && <Right paging={paging} onChange={onChange} />}
    </Flex>
  )
}

export default Pagination
