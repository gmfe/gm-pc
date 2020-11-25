import React, { FC } from 'react'
import Mask from './mask'
import { getLocale } from '@gm-pc/locales'

const Loading: FC = () => <Mask>{getLocale('加载数据中...')}</Mask>

export default Loading
