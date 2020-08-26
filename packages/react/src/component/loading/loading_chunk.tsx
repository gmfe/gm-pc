import React, { FC } from 'react'
import classNames from 'classnames'
import Loading from './loading'
import { Flex } from '../flex'
import { LoadingChunkProps } from './type'

const LoadingChunk: FC<LoadingChunkProps> = ({
  loading,
  className,
  children,
  size = '40px',
  style,
  text,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={classNames(className, {
        'gm-loading-chunk': loading,
      })}
    >
      {children}
      {loading && (
        <Flex alignCenter justifyCenter className='gm-loading-mask'>
          <Flex column alignCenter>
            <Loading size={size} />
            {text && <span className='gm-loading-text'>{text}</span>}
          </Flex>
        </Flex>
      )}
    </div>
  )
}

export default LoadingChunk
