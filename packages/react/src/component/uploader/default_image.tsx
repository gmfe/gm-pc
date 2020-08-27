import React, { FC } from 'react'
import classNames from 'classnames'
import { getLocale } from '@gm-pc/locales'
import DefaultContainer from './default_container'
import { DefaultImageProps } from './types'

const DefaultImage: FC<DefaultImageProps> = ({ className, children, ...rest }) => {
  return (
    <DefaultContainer {...rest} className={classNames('gm-text-12', className)}>
      {children ?? getLocale('+ 加图')}
    </DefaultContainer>
  )
}

export default DefaultImage
