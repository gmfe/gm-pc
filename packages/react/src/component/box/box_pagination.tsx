import React, { FC } from 'react'
import { Flex } from '../flex'

const BoxPagination: FC = ({ children }) => {
  return (
    <Flex justifyEnd className='gm-box gm-padding-20'>
      {children}
    </Flex>
  )
}

export default BoxPagination
