import React, { FC } from 'react'
import Mask from './mask'
import { getLocale } from '@gm-pc/locales'
import SVGEmpty from '../svg/empty.svg'

const Empty: FC = () => (
  <Mask>
    <div className='gm-padding-10 gm-flex gm-flex-column gm-flex-align-center'>
      <SVGEmpty style={{ width: '70px', height: '70px' }} />
      <div className='gm-text-desc'>{getLocale('没有数据了')}</div>
    </div>
  </Mask>
)

export default Empty
