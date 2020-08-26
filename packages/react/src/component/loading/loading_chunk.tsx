import React, { FC } from 'react'
import classNames from 'classnames'
import Loading from './loading'
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
        <div className='gm-loading-mask'>
          <Loading
            style={{
              ...style,
              width: size + 'px',
              height: size + 'px',
            }}
            text={text}
            size={size}
            className='gm-loading-position'
          />
        </div>
      )}
    </div>
  )
}

export default LoadingChunk
