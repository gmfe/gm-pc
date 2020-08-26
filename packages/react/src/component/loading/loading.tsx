import React, { FC } from 'react'
import classNames from 'classnames'
import LoadingIcon from './loading_icon'
import { LoadingProps } from './type'

const Loading: FC<LoadingProps> = ({ size, text, className, ...rest }) => {
  return (
    <span {...rest} className={classNames('gm-loading', className)}>
      <LoadingIcon size={size} />
      {text && <span className='gm-loading-text gm-text-primary'>{text}</span>}
    </span>
  )
}

export default Loading
