import React, { FC } from 'react'
import { LoadingProps } from './types'

const Loading: FC<LoadingProps> = ({ size = '1em', type = 'default' }) => {
  return (
    <svg
      className='gm-loading'
      style={{
        width: size,
        height: size,
      }}
      viewBox='0 0 50 50'
    >
      <circle
        className='gm-loading-path'
        cx='25'
        cy='25'
        r='20'
        fill='none'
        stroke={type === 'default' ? '#0363ff' : '#fff'}
      />
    </svg>
  )
}

export default Loading
