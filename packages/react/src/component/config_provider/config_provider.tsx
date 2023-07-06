import React, { FC } from 'react'
import { ConfigContext } from './context'

/** xs: 12px sm: 14px */
export type FontSizeType = 'xs' | 'sm'

export interface ConfigProviderProps {
  fontSize?: FontSizeType
}

// 加一个div加上css var
const ConfigProvider: FC<ConfigProviderProps> = ({ children, ...config }) => {
  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
}

export default ConfigProvider
