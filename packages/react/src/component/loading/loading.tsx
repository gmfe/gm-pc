import React, { FC } from 'react'
import { LoadingProps } from './type'

const Loading: FC<LoadingProps> = ({ size = '1em' }) => {
  return (
    <svg
      className='gm-loading'
      style={{
        width: size,
        height: size,
      }}
      viewBox='0 0 50 50'
    >
      <circle className='gm-loading-path' cx='25' cy='25' r='20' fill='none' />
    </svg>
  )
}

export default Loading
