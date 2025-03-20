import React, { FC } from 'react'
import { Flex } from '@gm-pc/react'

const Mask: FC = ({ children }) => {
  return (
    <Flex
      className='gm-table-x-mask'
      column
      alignCenter
      justifyCenter
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        marginTop: '50px',
        backgroundColor: 'rgba(255,255,255,0.8)',
      }}
    >
      {children}
    </Flex>
  )
}

export default Mask
