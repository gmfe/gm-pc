import React, { FC } from 'react'
import { Flex } from '../flex'

interface DividerProps {
  align?: 'left' | 'center' | 'right'
}

const Divider: FC<DividerProps> = ({ align = 'center', children }) => {
  return (
    <Flex className={`gm-divider gm-divider-${align}`}>
      <Flex flex className='gm-divider-line' />
      <div className='gm-padding-lr-10'>
        {typeof children === 'string' ? (
          <span className='gm-text-16'>{children}</span>
        ) : (
          children
        )}
      </div>
      <Flex flex className='gm-divider-line' />
    </Flex>
  )
}

export default Divider
