import React, { FC } from 'react'
import { getLocale } from '@gm-pc/locales'

const Header: FC = () => <div>{getLocale('操作')}</div>

export default Header
